import {useContext} from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import useColors from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'; 
import { AppContext } from '../../localStorage/LocalStorage';

const CustomQuestHeader = ({ route }) => {
  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark)

  const {deleteTest, db} = useContext(AppContext)
  const { test } = route.params

  function handleDelete () {
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
            deleteTest(db, test.id)
              .then (() => navigation.goBack())
          },
          style: 'destructive', // opcional, pero útil para destacar acciones peligrosas
        },
      ],
      { cancelable: true }
    );
  }

  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: Colors.green }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.boton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.text, paddingHorizontal:5 }]}>
          {route == null ? title : route.params.test.name}
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center", width:65}}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit',{ test})} style={[styles.miniButton, {backgroundColor:Colors.blue3}]}>
                <Ionicons name="pencil" size={24} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={[styles.miniButton, {backgroundColor:Colors.red}]}>
                <Ionicons name="trash" size={24} color={Colors.text} />
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row"
  },
  headerTitle: {
    fontSize: 20,
    width:"60%",
    textAlign:"center",
    fontFamily: "Montserrat-SemiBold",
  },
  miniButton: {
    backgroundColor:"blue",
    borderRadius:50,
    width:29,
    height:29,
    padding:2.5,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default CustomQuestHeader;