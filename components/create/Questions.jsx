import { StyleSheet, Text, View, Dimensions, TextInput,  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { globalStyles } from '../../Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import { Plus } from '../../assets/images/Plus';
import { LeftArrow } from '../../assets/images/LeftArrow';
import { Trash } from '../../assets/images/Trash'

import Colors from '../../utils/Colors';

const {width, height} = Dimensions.get('window')

const Questions = ({route}) => {

    const { QuestIndex } = route.params;

    const IsCompleted = true

    const [name, setName] = useState('');
    const [respuestas, setRespuestas] = useState(["",""]);
    const [correcta, setCorrecta] = useState(1)
    const [questions, setQuestions] = useState('');

    const navigation = useNavigation() 

    function handleNewResponse () {
        if (respuestas.length > 4) {
            return
        } else {
            const newResponse = [...respuestas, ""]
            setRespuestas(newResponse)
        }
    }

    function handleResponse (value, index) {
        let newResponse = [...respuestas]
        newResponse[index] = value
        setRespuestas(newResponse)
    }

    function handleDelete () {
        let newResponse = [...respuestas]
        newResponse.pop()
        setRespuestas(newResponse)
    }

    function handleSave () {
        navigation.navigate('Create')
    }

    function handleNextQuestion (direction) {
        if (IsCompleted) {
            setName('')
            setRespuestas(["",""])
            setCorrecta(1)
            navigation.navigate('Questions',{QuestIndex:QuestIndex + direction})
        } else {
            //mostrar alerta con diseño personalizado
            return
        }
    }

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: Colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={{ paddingTop: 45, }}>
                <View>
                    <View style={[styles.inputContainer, {paddingHorizontal: 20}]}>
                        <Text style={[styles.label,{fontSize:19}]}>Pregunta</Text>
                        <TextInput 
                            value={name}
                            placeholderTextColor={Colors.label}
                            onChangeText={(value) => setName(value)}
                            style={styles.input}
                            placeholder='Ingresar Textualmente la pregunta...'
                        />

                    </View>

                    <View style={{alignItems:"center"}}>
                        <Text style={styles.respuestas}>Opciones:</Text>
                    </View>

                    <View style={styles.responsesContainer}>
                        {respuestas.map((response, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={styles.label}>Opción {index+1}</Text>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <TextInput 
                                        value={response}
                                        placeholderTextColor={Colors.label}
                                        onChangeText={(value) => handleResponse(value, index)}
                                        style={styles.questionInput}
                                        placeholder='Ingresar Opción...'
                                    />
                                <View style={{alignItems:"center"}}>
                                    <TouchableOpacity style={{alignItems:"center"}} onPress={() => setCorrecta(index)}>
                                        <Text style={{fontSize:10, color:Colors.text}}>Correcta</Text>
                                        <Checkbox
                                          value={correcta == index}
                                          onValueChange={() => setCorrecta(index)}
                                          style={{ margin: 5, width: 25, height: 25, }}  // Asegura que no haya margen
                                        />
                                    </TouchableOpacity>

                                    {(index == respuestas.length-1 && respuestas.length > 2) && (
                                        <TouchableOpacity style={{width:30, height:40, paddingTop:5}} onPress={handleDelete}>
                                            <Trash color={Colors.text} />
                                        </TouchableOpacity>
                                    ) }


                                </View>
                                </View>

                            </View>
                        ))}
                        <TouchableOpacity onPress={handleNewResponse} style={styles.addResponse}>
                            <Text style={[styles.label]}>Añadir Opción +</Text>
                        </TouchableOpacity>
                    </View>
                    

                    

                </View>
                
                <View style={[styles.outContainer,{paddingHorizontal: 20}]}>

                    <View style={{}}>
                      <Text style={[styles.label,{textAlign:"center"}]}>Pregunta Número:</Text>

                      <View style={styles.indexContainer}>
                        <View style={styles.sideButtons}>
                            {QuestIndex > 1 && (
                              <TouchableOpacity onPress={() => handleNextQuestion(-1)}>
                                <LeftArrow color={Colors.text} size={30}/>
                              </TouchableOpacity>
                            )}
                        </View>


                        <Text style={styles.currentIndex}>{QuestIndex}</Text>

                        <View style={styles.sideButtons}>
                            {IsCompleted && (
                              <TouchableOpacity onPress={() => handleNextQuestion(1)}>
                                <Plus color={Colors.text} size={30}/>
                              </TouchableOpacity>
                            )}
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity onPress={handleSave} style={globalStyles.GreenButton}>
                        <Text style={styles.textButton}>Guardar Preguntas</Text>
                    </TouchableOpacity>

                </View>

                <View style={{height:50}}/>
            </ScrollView>

        </KeyboardAvoidingView>
    );

}


export default Questions;

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

        questionInput: {
            width: 255,
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
            color: Colors.text
        },
        inputContainer: {
            marginTop: 15,
            height: 120,
        },
        outContainer: {
            paddingBottom: 30,
            alignItems: "center",
            marginTop:60
        },
        textButton: {
            fontSize: 20,
            fontFamily: "Montserrat-SemiBold",
            textAlign: "center",
            color: "white"
        },
        respuestas: {
            color: Colors.text,
            fontFamily:"Montserrat-Bold",
            fontSize:20,
            marginBottom:20
        },
        sideButtons: {
            width:30,
            height:30,
            alignItems:"center",
        },
        currentIndex: {
            color: Colors.text,
            fontSize:25
        },
        indexContainer: {
            justifyContent:"space-evenly",
            width,
            alignItems:"center",
            paddingHorizontal:"20%",
            paddingTop:10,
            paddingBottom:15,
            flexDirection: "row",
        },
        addResponse: {
            justifyContent:"center",
            alignItems:"center",
            height:80
        },
        responsesContainer: {
            backgroundColor:Colors.transparentGreen,
            paddingHorizontal:15,
            borderRadius:15,
            marginHorizontal: 10
        }
    });
