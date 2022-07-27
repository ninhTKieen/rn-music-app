import React from 'react';

import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { Surface, Title, Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';
import {
  authActions,
  selectedIsPendingLoggedIn,
} from 'src/features/auth/auth.slice';

import { Colors } from 'src/constants';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const isPendingLoggedIn = useAppSelector(selectedIsPendingLoggedIn);

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(false);

  const onLoginPress = async () => {
    dispatch(authActions.login({ email, password }));
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'You have to login first!',
    });
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Surface style={styles.inner}>
            <Image
              source={require('src/assets/music_app_logo.webp')}
              style={styles.image}
            />

            <Title style={styles.title}>Login</Title>

            <TextInput
              label="Email"
              right={<TextInput.Icon name="account" />}
              style={styles.input}
              mode="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
              children={undefined}
              onPressIn={undefined}
              onPressOut={undefined}
              textAlign={undefined}
              autoComplete={undefined}
            />

            <TextInput
              label="Password"
              right={
                <TextInput.Icon
                  name={visible ? 'eye-off' : 'eye'}
                  onPress={() => setVisible(!visible)}
                />
              }
              style={styles.input}
              secureTextEntry={!visible}
              mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              children={undefined}
              onPressIn={undefined}
              onPressOut={undefined}
              textAlign={undefined}
              autoComplete={undefined}
            />

            <Button
              mode="contained"
              onPress={onLoginPress}
              style={styles.button}
              loading={isPendingLoggedIn}>
              <Text>Login</Text>
            </Button>

            <Button
              mode="text"
              style={styles.button}
              onPress={() => navigation.navigate('Register')}>
              Don't have an account ?
            </Button>
          </Surface>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  image: {
    height: 200,
    width: 150,
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
    color: Colors.primary,
  },

  input: {
    width: '90%',
    height: 50,
    marginBottom: 20,
  },

  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
});
export default LoginScreen;
