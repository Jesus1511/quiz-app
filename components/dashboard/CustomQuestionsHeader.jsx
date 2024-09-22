import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import useColors from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'; 

import { useContext } from 'react';
import { AppContext } from '../../localStorage/LocalStorage';
import { Alert } from 'react-native';

const CustomQuestionsHeader = ({ route }) => {
  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark)

  const navigation = useNavigation();

  const {setIntento, setFailedQuests} = useContext(AppContext)
  const {test} = route.params

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>

        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Confirmación',
            '¿Estás seguro de que terminar el test? perderas todo tu progreso',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Salir',
                onPress: () => {
                  navigation.goBack()
                  setIntento([])
                  setFailedQuests([])
                },
                style: 'destructive', 
              },
            ],
            { cancelable: true }
          )}} style={styles.boton}>
            <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: Colors.text }]}>
          {test.name}
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

export default CustomQuestionsHeader;
