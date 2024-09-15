import { StyleSheet, View, ScrollView, useColorScheme } from 'react-native'
import NavigationBar from '../NavigationBar';
import useColors from '../../utils/Colors';

import Theresholds from './Theresholds';
import Exams from './Exams';

const CreateScreen = () => {
    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    return (
      <View style={{ flex: 1, backgroundColor:Colors.background }}>
          <ScrollView>
            <Theresholds />
            <Exams />
          </ScrollView>
          <NavigationBar Colors={Colors}/>
      </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({})