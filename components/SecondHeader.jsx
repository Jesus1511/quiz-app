import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const SecondHeader = ({ title, button }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.header, { backgroundColor: isDark ? "#6fc200" : "#9adc29" }]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    width:"60%",
    textAlign:"center",
    fontFamily: "Montserrat-SemiBold",
  },
});

export default SecondHeader;
