import { StyleSheet, Text, View, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import NavigationBar from '../NavigationBar';
import Colors from '../../utils/Colors';

const CreateScreen = () => {
    const isDark = useColorScheme() === 'dark';

    return (
      <View style={{ flex: 1, backgroundColor:Colors.background }}>
          <ScrollView>
  
          </ScrollView>
          <NavigationBar />
      </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({})