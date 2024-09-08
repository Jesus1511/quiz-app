import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import NavigationBar from '../NavigationBar';
import Colors from '../../utils/Colors';

const DashboardScreen = () => {

  return (
    <View style={{ flex: 1, backgroundColor:Colors.background }}>
        <ScrollView>

        </ScrollView>
        <NavigationBar />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})