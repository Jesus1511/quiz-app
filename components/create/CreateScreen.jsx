import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, useColorScheme, Animated, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useContext, useState, useRef } from 'react';
import NavigationBar from '../NavigationBar';
import { globalStyles, isDark } from '../../Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../utils/Colors';
import { useSQLiteContext } from 'expo-sqlite';

import { AppContext } from '../../localStorage/LocalStorage';
import { AntDesign } from '@expo/vector-icons';
import ImportsModel from './ImportsModel';

const { width, height } = Dimensions.get('window');

const CreateScreen = () => {

  const db = useSQLiteContext()

  const [name, setName] = useState('');
  const { categorias, questions, setQuestions, createTest } = useContext(AppContext); // Categorías de contexto
  const [selectedCategory, setSelectedCategory] = useState('');
  const [time, setTime] = useState("");

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Estado del menú de categorías
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = useNavigation();

  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark);

  const slideAnim = useRef(new Animated.Value(0)).current; // Animación de deslizar
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isCategoryMenuOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isCategoryMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isCategoryMenuOpen && isMenuOpen) {
      setIsCategoryMenuOpen(false)
    }
  }, [isMenuOpen, isCategoryMenuOpen])
  


  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0], // Rango de desplazamiento vertical
  });

  function handleSaveExam() {
    if (name == "") {
      ToastAndroid.show("Seleccione un nombre para el examen", ToastAndroid.LONG)
      return
    } else if (selectedCategory == "") {
      ToastAndroid.show("Seleccione una categoria para el examen", ToastAndroid.LONG)
      return 
    } else if (time == "" || time < 5) {
      ToastAndroid.show("El minimo son 5 segundos por pregunta ", ToastAndroid.LONG)
      return
    } else if (questions.length < 1) {
      ToastAndroid.show("Seleccione las preguntas y respuestas ", ToastAndroid.LONG)
      return
    }
    const newTest = {name, categoria:selectedCategory, tiempo:time, preguntas:questions, intentos:[], fails:[]}
    createTest(db, newTest)
    setQuestions([])
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >


      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 100, paddingBottom: 30, justifyContent: 'space-between' }}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors.text }]}>Nombre del Examen</Text>
            <TextInput
              value={name}
              editable={!isMenuOpen && !isCategoryMenuOpen}
              placeholderTextColor={Colors.label}
              onChangeText={(value) => setName(value)}
              style={[styles.input, { color: Colors.text, borderBottomColor: Colors.label }]}
              placeholder="Ingresar Nombre..."
            />
          </View>


          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors.text }]}>Categoría</Text>
            <TouchableOpacity
              onPress={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              style={[styles.input, { justifyContent: 'center', borderBottomColor: Colors.label }]}
            >
              <Text style={{ color: selectedCategory ? Colors.text : Colors.label, fontSize:18 }}>
                {selectedCategory ? selectedCategory : 'Ingresar Categoría...'}
              </Text>
            </TouchableOpacity>


            <Animated.View style={[styles.dropdown, { transform: [{ translateY }] }]}>
              {isCategoryMenuOpen && (
                <>
                <ScrollView>
                  {categorias.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        setSelectedCategory(item.value);
                        setIsCategoryMenuOpen(false);
                      }}
                      style={[styles.dropdownItem, {backgroundColor:Colors.transparentGreen}]}
                    >
                      <Text style={{ color: Colors.text }}>{item.value}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Categorias')
                      }}
                      style={[styles.dropdownItem, {backgroundColor:Colors.transparentGreen}]}
                    >
                      <Text style={{ color: Colors.text, fontSize:15, textAlign:"center", paddingVertical:10 }}>Añadir nueva categoria +</Text>
                    </TouchableOpacity>
                </ScrollView>
                </>

              )}
            </Animated.View>
            <View style={globalStyles.bar} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors.text }]}>Segundos por cada pregunta</Text>
            <TextInput
              value={String(time)}
              editable={!isMenuOpen && !isCategoryMenuOpen}
              placeholderTextColor={Colors.label}
              onChangeText={(value) => setTime(Number(value))}
              style={[styles.input, { color: Colors.text, borderBottomColor: Colors.label }]}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors.text, marginBottom:15 }]}>Preguntas y Respuestas</Text>
              <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.questionsInput}>
                {questions.length > 1 ? (
                  <View style={{borderColor:Colors.label, height:57, borderWidth:1, borderRadius:10, paddingHorizontal:100, paddingVertical:10}}>
                    <Text style={{ color: Colors.text, fontSize:20 }}>Preguntas: {questions.length}</Text>
                  </View>
                ):(
                  <Text style={[styles.questionsText, { color: Colors.label }]}>Ingresar Preguntas +</Text>
                )}
              </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSaveExam} style={globalStyles.GreenButton}>
            <Text style={styles.textButton}>Crear Examen</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isMenuOpen && (
        <>
          <Animated.View
            style={[styles.background, { opacity: opacityAnim }]}
            >
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={{ flex: 1 }} />
          </Animated.View>
          <Animated.View style={[styles.questionsMenu, { backgroundColor: Colors.green, transform: [{ translateY: slideAnim }] }]}>
            <MenuQuestions setIsMenuOpen={setIsMenuOpen} questions={questions}/>
          </Animated.View>
        </>
      )}
      {isCategoryMenuOpen && (
        <TouchableOpacity onPress={() =>setIsCategoryMenuOpen(false)} style={[styles.background, {backgroundColor:"transparent"}]}></TouchableOpacity>
      )}
      <NavigationBar Colors={Colors} />
    </KeyboardAvoidingView>
  );
};

const MenuQuestions = ({setIsMenuOpen, questions}) => {

  const navigation = useNavigation()

  const isDark = useColorScheme() === "dark"
  const Colors = useColors(isDark)

  const {handleDowload, handleImportCSV, handleImportEcxel} = ImportsModel()

  return (
      <>

      <View style={[styles.questionsMenu, {backgroundColor: Colors.green}]}>
          <TouchableOpacity style={[styles.menuButtons, {backgroundColor:Colors.darkGreen, width: "80%"}]}  onPress={() => {navigation.navigate('Questions', {QuestIndex: 0, isEditing:false}); setIsMenuOpen(false)}}>
              <Text style={[styles.menuTexts, {color: Colors.text,}]}>{questions.length > 1?"Editar Preguntas":"Rellenar Manualmente"}</Text>
          </TouchableOpacity>
          <View style={{width:"80%", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity onPress={() => handleImportCSV()} style={[styles.menuButtons, {backgroundColor:Colors.darkGreen,}]}>
                <Text style={[styles.menuTexts, {color: Colors.text,}]}>Subir Plantilla CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDowload("CSV")} style={[styles.miniMenuButtons, {backgroundColor:Colors.darkGreen,}]}>
              <AntDesign name="download" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{width:"80%", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity onPress={() => handleImportEcxel()} style={[styles.menuButtons, {backgroundColor:Colors.darkGreen,}]}>
                <Text style={[styles.menuTexts, {color: Colors.text,}]}>Subir Plantilla Ecxel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDowload("ECXEL")} style={[styles.miniMenuButtons, {backgroundColor:Colors.darkGreen,}]}>
              <AntDesign name="download" size={24} color="black" />
            </TouchableOpacity>
          </View>
      </View>
      </>
      
  )
}

export default CreateScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  inputContainer: {
    marginTop: 25,
  },
  dropdown: {
    position: 'absolute',
    top: 60, // Ajustar la posición debajo del input
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
  },
  buttonContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: 'white',
  },
  questionsInput: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsText: {
    fontSize: 18,
  },
  background: {
    position:"absolute",
    width,
    height,
    top:0,
    left:0,
  },
  questionsMenu: {
      width,
      height: 400,
      paddingTop:10,
      paddingBottom:70,
      justifyContent:"space-evenly",
      alignItems:"center",
      position:"absolute",
      bottom:0,
      left:0,
      
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
    width:230,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
  },
  miniMenuButtons: {
    height:75,
    width:52,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
  },
  menuTexts: {
    fontFamily:"Montserrat-SemiBold",
    fontSize:18,
    textAlign:"center"
  }
});
