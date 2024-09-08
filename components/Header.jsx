import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import colors from '../utils/Colors';

const Header = ({ title }) => {

  return (
    <View style={[styles.header, { backgroundColor: colors.green }]}>
      <Text style={styles.headerTitle}>{title}</Text>
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
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default Header;
