import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

import useColors from '../utils/Colors';

const Header = ({ title }) => {

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
      <Text style={[styles.headerTitle,{color: Colors.text,}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 200,   // Radio en la esquina inferior izquierda
    borderBottomRightRadius: 200,  // Radio en la esquina inferior derecha
    elevation:5
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default Header;
