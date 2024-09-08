import { StyleSheet, Appearance } from 'react-native'

export const isDark = Appearance.getColorScheme() === 'dark';

export const globalStyles = StyleSheet.create({
    GreenButton: {
        backgroundColor: isDark ? "#6fc200" : "#9adc29",
        width: "95%",
        height:60,
        justifyContent:"center",
        borderRadius:15
    },
    bar:{
        height: 1,
        backgroundColor: "#878787",
    }
  })