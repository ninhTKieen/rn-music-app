import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Back, DoubleQuaver } from 'src/icons';

const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation}>
        <Back size={28} />
      </TouchableOpacity>
      <DoubleQuaver size={35} />
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
