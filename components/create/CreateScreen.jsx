import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useContext } from 'react';
import NavigationBar from '../NavigationBar';
import { useState } from 'react';
import { globalStyles } from '../../Styles/GlobalStyles';
import { Picker } from '@react-native-picker/picker';;
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';

import { FBContext } from '../../Firebase/FirebaseContext';

const {width, height} = Dimensions.get('window')

const CreateScreen = () => {

    const [name, setName] = useState('');
    const { categorias } = useContext(FBContext)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [time, setTime] = useState('');
    const [questions, setQuestions] = useState('');

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {

    },[])

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: Colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30, justifyContent: "space-between" }}>
                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre del Examen</Text>
                        <TextInput 
                            value={name}
                            placeholderTextColor={Colors.label}
                            onChangeText={(value) => setName(value)}
                            style={styles.input}
                            placeholder='Ingresar Nombre...'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Categoría</Text>
                        <Picker
                          selectedValue={selectedCategory}
                          onValueChange={(value) => setSelectedCategory(value)}
                          placeholderTextColor={Colors.label}
                          style={{ ...pickerSelectStyles }}>
                          
                          <Picker.Item style={{color:Colors.label}}  label="  Ingresar Categoría..." value={null} />
                          {categorias.map((item) => (
                            <Picker.Item  label={item.label} value={item.value} key={item.value} />
                          ))}
                        </Picker>
                        <View style={globalStyles.bar}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Segundos por cada pregunta</Text>
                        <TextInput 
                            value={String(time)}
                            placeholderTextColor={Colors.label}
                            onChangeText={(value) => setTime(Number(value))}
                            style={styles.input}
                            placeholder='Ingresar Segundos...'
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Preguntas y Respuestas</Text>
                        <TouchableOpacity onPress={()=>setIsMenuOpen(true)} style={styles.questionsInput}>
                            <Text style={styles.questionsText}>Ingresar Preguntas +</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity  style={globalStyles.GreenButton}>
                        <Text style={styles.textButton}>Crear Examen</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NavigationBar />
            {isMenuOpen && (<MenuQuestions setIsMenuOpen={setIsMenuOpen}/>)}
        </KeyboardAvoidingView>
    );

}

const MenuQuestions = ({setIsMenuOpen}) => {

    const navigation = useNavigation()

    return (
        <>
        <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.background}/>

        <View style={styles.questionsMenu}>
            <TouchableOpacity onPress={() => {navigation.navigate('Questions', {QuestIndex: 1}); setIsMenuOpen(false)}} style={styles.menuButtons}>
                <Text style={styles.menuTexts}>Rellenar Manualmente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButtons}>
                <Text style={styles.menuTexts}>Descargar Plantilla CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButtons}>
                <Text style={styles.menuTexts}>Descargar Plantilla Ecxel</Text>
            </TouchableOpacity>
        </View>
        </>
        
    )
}

export default CreateScreen;

const styles = StyleSheet.create({
        input: {
            width: "100%",
            height: 50,
            fontSize: 18,
            borderBottomWidth: 1,
            borderBottomColor: "#878787",
            color: Colors.text,
            paddingLeft: 20
        },
        label: {
            fontSize: 16,
            fontFamily: "Montserrat-SemiBold",
            color: Colors.text,
        },
        inputContainer: {
            marginTop: 25,
        },
        buttonContainer: {
            marginTop: 60,
            alignItems: "center",
        },
        textButton: {
            fontSize: 20,
            fontFamily: "Montserrat-SemiBold",
            textAlign: "center",
            color: "white"
        },
        questionsInput: {
            width: "100%",
            height: 50,
            justifyContent:"center",
            alignItems:"center"
        },
        questionsText: {
            fontSize: 18,
            color: Colors.label
        },
        questionsMenu: {
            backgroundColor: Colors.background,
            width,
            height: 400,
            paddingTop:15,
            paddingBottom:50,
            justifyContent:"space-evenly",
            alignItems:"center",
            position:"absolute",
            bottom:0,
            left:0
        },
        background: {
            backgroundColor:"#0000004a",
            width,
            height,
            position:"absolute",
            top:-70,
            left:0,
            
        },
        menuButtons:{
            height:75,
            backgroundColor:Colors.green,
            width:"80%",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:20
        },
        menuTexts: {
            color: Colors.text,
            fontFamily:"Montserrat-SemiBold",
            fontSize:18,
            textAlign:"center"
        }
    });

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });