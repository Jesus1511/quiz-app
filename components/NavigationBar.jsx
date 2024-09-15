import { StyleSheet, View, TouchableOpacity, useColorScheme, Text } from 'react-native'
import React from 'react'
import {Home, BarChart, AddCircle} from '../assets/images/Icons'
import { useNavigation } from '@react-navigation/native'
import useColors from '../utils/Colors';

const NavigationBar = () => {
  const navigation = useNavigation()
  const isDark = useColorScheme() === 'dark'
  const Colors = useColors(isDark)

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Home')}>
        <Home size={40} color={Colors.text} />
        <Text style={[styles.text, { color: Colors.text }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Create')}>
        <AddCircle size={40} color={Colors.text} />
        <Text style={[styles.text, { color: Colors.text }]}>Crear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Stats')}>
        <BarChart size={40} color={Colors.text} />
        <Text style={[styles.text, { color: Colors.text }]}>Stats</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NavigationBar

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  touchable: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
