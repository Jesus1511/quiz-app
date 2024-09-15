import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import useColors from '../utils/Colors'
import { Ionicons } from '@expo/vector-icons'; 

const SecondHeader = ({ title, button, route }) => {
  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark)

  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
      {button !== null && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.boton}>
          {button == 1? (
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          ):(
            <Ionicons name="close" size={24} color={Colors.text} />
          )}
        </TouchableOpacity>
      )}
        <Text style={[styles.headerTitle, { color: Colors.text }]}>
          {route == null ? title : route.params.test.name}
        </Text>

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
    fontSize: 20,
    width:"60%",
    textAlign:"center",
    fontFamily: "Montserrat-SemiBold",
  },
  boton: {
    position:"absolute",
    width:50,
    height:50,
    left:30,
    top:25,
  }
});

export default SecondHeader;
