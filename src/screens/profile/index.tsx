import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Layout, Text, Button } from '@ui-kitten/components';

import Header from './components/Header';
import { Colors } from 'src/constants';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';
import { authActions, selectedCurrentUser } from 'src/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';

import { format } from 'date-fns';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectedCurrentUser);

  React.useEffect(() => {
    dispatch(authActions.getCurrentUser({ id: auth()?.currentUser?.uid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Layout style={styles.container}>
      <Header navigation={goBack} />
      <Layout level="4" style={styles.wrapAvatar}>
        <Avatar
          style={{ width: 96, height: 96 }}
          source={{ uri: `data:image/jpeg;base64,${currentUser?.avatar}` }}
        />
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
          <Text>{currentUser?.email}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text appearance="hint">Name</Text>
          <Text>{currentUser?.fullName}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text appearance="hint">Date of birth</Text>
          <Text>{format(new Date(1657552583590), 'dd/MM/yyyy')}</Text>
        </View>
      </Layout>

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
