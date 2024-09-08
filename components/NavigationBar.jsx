import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import {Home, BarChart, AddCircle} from '../assets/images/Icons'
import { useNavigation } from '@react-navigation/native'
import Colors from '../utils/Colors'

const NavigationBar = () => {

    const navigation = useNavigation()

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
      <TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate('Home')}>
        <Home size={40} color={Colors.text}/>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate('Create')}>
        <AddCircle size={40} color={Colors.text}/>
        <Text style={styles.text}>Crear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate('Stats')}>
        <BarChart size={40} color={Colors.text}/>
        <Text style={styles.text}>Stats</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NavigationBar

const styles = StyleSheet.create({
    header:{
        height:75,
        flexDirection:"row",
        paddingHorizontal:10,
        justifyContent:"space-evenly",
        alignItems:"center",
    },
    text: {
      fontSize:13,
      color:Colors.text
    },
    touchable: {
        width: 55,
        height:55,
        justifyContent:"center",
        alignItems:"center"
    }
})