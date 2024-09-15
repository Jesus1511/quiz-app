import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import useColors from '../../utils/Colors'

const Theresholds = () => {

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <View>
      <Text>Theresholds</Text>
    </View>
  )
}

export default Theresholds

const DynamicStyles = (Colors) => StyleSheet.create({})