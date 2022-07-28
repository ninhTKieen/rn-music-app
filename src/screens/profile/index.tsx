import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Avatar, Layout, Text, Button } from '@ui-kitten/components';

import Header from './components/Header';
import { Colors } from 'src/constants';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';
import { authActions, selectedCurrentUser } from 'src/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';

import { format } from 'date-fns';

import * as ImagePicker from 'react-native-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectedCurrentUser);

  const [uri, setUri] = useState(null);
  const [changeData, setChangeData] = useState({});
  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDay, setBirthDay] = useState('');

  React.useEffect(() => {
    dispatch(authActions.getCurrentUser({ id: auth()?.currentUser?.uid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('dispatch getCurrentUser');
  }, [dispatch]);

  const goBack = () => {
    navigation.goBack();
  };

  const pickFromLibrary = async () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    };
    const result = await ImagePicker.launchImageLibrary(options as any);
    if (!(result as any)?.didCancel) {
      setUri((result as any).assets[0].base64);
      setChangeData({
        ...changeData,
        avatar: (result as any).assets[0].base64,
      });
    }

    // await savePicture(result.assets[0].uri);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Layout style={styles.container}>
            <Header navigation={goBack} />
            <Layout level="4" style={styles.wrapAvatar}>
              <TouchableOpacity onPress={pickFromLibrary}>
                <Avatar
                  style={{ width: 96, height: 96 }}
                  source={{
                    uri: uri
                      ? `data:image/jpeg;base64,${uri}`
                      : `data:image/jpeg;base64,${currentUser?.avatar}`,
                  }}
                />
              </TouchableOpacity>
            </Layout>

            <Layout
              style={{
                width: '100%',
                marginBottom: 16,
                backgroundColor: Colors.background,
              }}
              level="1">
              <View style={styles.itemContainer}>
                <Text appearance="hint">Email</Text>
                <Text appearance="hint">{currentUser?.email}</Text>
              </View>

              <View style={styles.itemContainer}>
                <Text appearance="hint">Gender</Text>
                <Text appearance="hint">{currentUser?.gender}</Text>
              </View>

              <View style={styles.itemContainer}>
                <Text appearance="hint">Full name</Text>
                <TextInput
                  value={fullName ? fullName : currentUser?.fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    setChangeData({ ...changeData, fullName: text });
                  }}
                  style={{ color: 'white', padding: 0 }}
                />
              </View>

              <View style={styles.itemContainer}>
                <Text appearance="hint">Name</Text>
                <TextInput
                  value={name ? name : currentUser?.username}
                  onChangeText={(text) => {
                    setName(text);
                    setChangeData({ ...changeData, username: text });
                  }}
                  style={{ color: 'white', padding: 0 }}
                />
              </View>

              <View style={styles.itemContainer}>
                <Text appearance="hint">Date of birth</Text>
                <TextInput
                  value={
                    birthDay
                      ? birthDay
                      : format(
                          currentUser?.dateOfBirth
                            ? new Date(Number(currentUser?.dateOfBirth))
                            : new Date(),
                          'dd/MM/yyyy',
                        )
                  }
                  onChangeText={(text) => {
                    setBirthDay(String(new Date(text).getTime()));
                    setChangeData({
                      ...changeData,
                      dateOfBirth: new Date(text).getTime,
                    });
                  }}
                  style={{ color: 'white', padding: 0 }}
                />
              </View>
            </Layout>
            <Button
              onPress={() => {
                dispatch(
                  authActions.updateUser({
                    id: auth()?.currentUser?.uid,
                    data: changeData,
                  }),
                );
              }}
              style={styles.button}
              status="success"
              disabled={Object.keys(changeData).length === 0}>
              Save
            </Button>

            <Button
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'));
                dispatch(authActions.logout());
              }}
              style={styles.button}
              status="success">
              Logout
            </Button>
          </Layout>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: initialWindowMetrics?.insets.top ?? 0,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    borderBottomColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 0.5,
  },

  wrapAvatar: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  button: {
    marginHorizontal: 10,
    marginTop: 'auto',
    backgroundColor: Colors.primary,
  },
});

export default ProfileScreen;
