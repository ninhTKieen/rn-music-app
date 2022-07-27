import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';

import { Playlist } from './components/Playlist';
import { Player } from './components/Player';

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Playlist navigation={() => navigation.navigate('Profile')} />
      <Player />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
