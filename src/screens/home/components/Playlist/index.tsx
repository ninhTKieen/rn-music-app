import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { tracks, playlists } from 'src/data';

import { Colors } from 'src/constants';
import { usePlaylist } from 'src/provider';

import { MINI_AREA_HEIGHT } from '../Player/Dimensions';

import { Header } from './Header';
import { Title } from './Title';
import { TabBar } from './TabBar';
import { Lists } from './Lists';

import firestore from '@react-native-firebase/firestore';

interface PlaylistProps {
  navigation: any;
}

export const Playlist: React.FC<PlaylistProps> = ({ navigation }: any) => {
  const { setLists, setTracks } = usePlaylist();
  const [sounds, setSounds] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    setLists(categories);
    setTracks(
      sounds.map((item: any, index: any) => ({
        ...item,
        id: String(item.id),
        url: tracks[item.id - 1]?.source,
      })),
    );
  }, [setLists, setTracks, sounds, categories]);

  useEffect(() => {
    firestore()
      .collection('songs')
      .get()
      .then((data) => {
        const result: any = data.docs;
        setSounds(
          result.map((doc: any) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }),
        );
      });
    firestore()
      .collection('categories')
      .get()
      .then((data) => {
        const result: any = data.docs;
        setCategories(
          result.map((doc: any) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }),
        );
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Title />
      <TabBar />
      <Lists />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: initialWindowMetrics?.insets.top ?? 0,
    paddingBottom: MINI_AREA_HEIGHT,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
});
