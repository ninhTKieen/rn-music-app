import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, Gear, DoubleQuaver } from 'src/icons';

const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Search size={28} />
      <DoubleQuaver size={35} />
      <TouchableOpacity onPress={navigation}>
        <Gear size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default Header;
