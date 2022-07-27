import React from 'react';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Surface,
  TextInput,
  Title,
  Subheading,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Datepicker } from '@ui-kitten/components';
import { useAppDispatch } from 'src/hooks/redux.hook';
import { authActions } from 'src/features/auth/auth.slice';

import { Colors } from 'src/constants';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');
  const [dateOfBirth, setDateOfBirth] = React.useState<Date>(new Date());
  const [visible, setVisible] = React.useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Surface style={styles.innerContainer}>
            <Title style={styles.title}>Hello</Title>

            <Subheading style={{ marginBottom: 10, color: Colors.primary }}>
              Register new account
            </Subheading>

            <Surface style={styles.wrapper}>
              <TextInput
                mode="outlined"
                label="Email"
                style={styles.input}
                right={<TextInput.Icon name="email" />}
                value={emailAddress}
                onChangeText={setEmailAddress}
                children={undefined}
                onPressIn={undefined}
                onPressOut={undefined}
                textAlign={undefined}
                autoComplete={undefined}
              />
            </Surface>

            <Surface style={styles.wrapper}>
              <TextInput
                mode="outlined"
                label="Gender"
                style={styles.inputWrapper}
                right={<TextInput.Icon name="gender-male-female" />}
                value={gender}
                onChangeText={setGender}
                children={undefined}
                onPressIn={undefined}
                onPressOut={undefined}
                textAlign={undefined}
                autoComplete={undefined}
              />
              <Surface style={styles.dateOfBirth}>
                <Icon name="birthday-cake" size={32} color="#fff" />
                <Datepicker
                  style={{ flex: 1 }}
                  placeholder="Birthday"
                  date={dateOfBirth}
                  onSelect={(date) => setDateOfBirth(date)}
                />
              </Surface>
            </Surface>

            <Surface style={styles.wrapper}>
              <TextInput
                mode="outlined"
                label="Username"
                style={styles.input}
                right={<TextInput.Icon name="account" />}
                value={userName}
                onChangeText={setUserName}
                children={undefined}
                onPressIn={undefined}
                onPressOut={undefined}
                textAlign={undefined}
                autoComplete={undefined}
              />
            </Surface>

            <Surface style={styles.wrapper}>
              <TextInput
                mode="outlined"
                label="Full Name"
                style={styles.input}
                right={<TextInput.Icon name="account" />}
                value={fullName}
                onChangeText={setFullName}
                children={undefined}
                onPressIn={undefined}
                onPressOut={undefined}
                textAlign={undefined}
                autoComplete={undefined}
              />
            </Surface>

            <Surface style={styles.wrapper}>
              <TextInput
                mode="outlined"
                label="Password"
                style={styles.input}
                secureTextEntry={!visible}
                right={
                  <TextInput.Icon
                    name={visible ? 'eye-off' : 'eye'}
                    onPress={() => setVisible(!visible)}
                  />
                }
                value={password}
                onChangeText={setPassword}
                children={undefined}
                onPressIn={undefined}
                onPressOut={undefined}
                textAlign={undefined}
                autoComplete={undefined}
              />
            </Surface>

            <Button
              mode="contained"
              style={styles.button}
              // onPress={onRegisterButtonPress}
            >
              <Text>Register</Text>
            </Button>

            <Button
              mode="text"
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              Already have an account ?
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

  innerContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    marginTop: 20,
    color: Colors.primary,
  },

  input: {
    height: 40,
    width: '100%',
  },

  wrapper: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  inputWrapper: {
    height: 40,
    width: '45%',
  },

  dateOfBirth: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '45%',
  },

  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
