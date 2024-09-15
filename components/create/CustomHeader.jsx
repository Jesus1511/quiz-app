import {useContext} from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import useColors from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'; 

import { AppContext } from '../../localStorage/LocalStorage'

const CustomHeader = () => {
  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark)

  const { setQuestions } = useContext(AppContext)

  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
        <TouchableOpacity onPress={() => {
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que quieres eliminar las preguntas?',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Eliminar',
                    onPress: () => {
                      navigation.goBack()
                      setQuestions([])
                    },
                    style: 'destructive', // opcional, pero útil para destacar acciones peligrosas
                  },
                ],
                { cancelable: true }
              );

        }} style={styles.boton}>
            <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.text }]}>
          Añadir Preguntas Manualmente
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

export default CustomHeader;
