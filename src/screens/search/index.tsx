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
import { Surface, Title, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import Header from './component/Header';

import { Colors } from 'src/constants';

const SearchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Surface style={styles.inner}>
            <Header navigation={navigation} />
            <TextInput
              label="Search"
              right={<TextInput.Icon name="search-web" />}
              style={styles.input}
              mode="outlined"
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              children={undefined}
              onPressIn={undefined}
              onPressOut={undefined}
              textAlign={undefined}
              autoComplete={undefined}
            />
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
    width: '100%',
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
export default SearchScreen;
