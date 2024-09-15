import { StyleSheet, View, ScrollView, useColorScheme } from 'react-native'
import NavigationBar from '../NavigationBar';
import useColors from '../../utils/Colors';
import Exams from './Exams';

const DashboardScreen = () => {

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  return (
    <View style={{ flex: 1, backgroundColor:Colors.background }}>
        <ScrollView>
          <Exams />
        </ScrollView>
        <NavigationBar Colors={Colors}/>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})