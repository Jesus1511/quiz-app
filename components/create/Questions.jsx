import { StyleSheet, Text, View, Dimensions, TextInput, useColorScheme, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { AppContext } from '../../localStorage/LocalStorage';
import { globalStyles } from '../../Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import { Plus } from '../../assets/images/Plus';
import { LeftArrow } from '../../assets/images/LeftArrow';
import { Trash } from '../../assets/images/Trash'

import useColors from '../../utils/Colors';
import { alphabet, preguntas } from '../../utils/Consts';

const {width, height} = Dimensions.get('window')

const Questions = ({route}) => {


    const { QuestIndex, isEditing } = route.params;

    const { questions, setQuestions} = useContext(AppContext)

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const [name, setName] = useState('');
    const [questIndex, setQuestIndex] = useState(QuestIndex)
    const [respuestas, setRespuestas] = useState([{opcion:"", isTrue:false},{opcion:"", isTrue:true}]);

    const navigation = useNavigation() 

    useEffect(() => {
        if (questions[QuestIndex]) {
            setName(questions[QuestIndex].pregunta)
            setRespuestas(questions[QuestIndex].opciones)
            setQuestIndex(QuestIndex)
        } else {
            setName('')
            setRespuestas([{opcion:"", isTrue:false},{opcion:"", isTrue:true}])
            setQuestIndex(QuestIndex)
        }

    }, [QuestIndex])

    useEffect(() => {
            let newQuestions = [...questions];
            if (name !== "") {}
            newQuestions[QuestIndex] = {
                ...newQuestions[QuestIndex], 
                pregunta: name,
                opciones: respuestas
            };
            setQuestions(newQuestions)

    }, [name, respuestas,]);
    
    
    

    function handleNewResponse () {
        if (respuestas.length > 4) {
            return
        } else {
            const newResponse = [...respuestas, {opcion:"", isTrue:false}]
            setRespuestas(newResponse)
        }
    }

    function handleResponse (value, index) {
        let newResponse = [...respuestas]
        newResponse[index] = {opcion:value, isTrue:newResponse[index].isTrue}
        setRespuestas(newResponse)
    }

    function handleDelete() {
        let newResponse = [...respuestas];
        const lastElement = newResponse[newResponse.length - 1];
        
        if (lastElement && lastElement.isTrue) {
            const previousIndex = newResponse.length - 2;
            
            if (previousIndex >= 0) {
                newResponse[previousIndex] = {
                    ...newResponse[previousIndex],
                    isTrue: true
                };
            }
        }
    
        newResponse.pop();
        setRespuestas(newResponse);
    }
    
    function handleSave () {
        if (questions.length < 5) {
            ToastAndroid.show('Crea un minimo de 5 preguntas', ToastAndroid.LONG)
            return
        }
        if (!isCompleted()) {
           return 
        }
        const isName = questions.some((respuesta) => respuesta.pregunta == "")
        const hasEmptyOption = questions.some((respuesta) => 
            respuesta.opciones.some((response) => response.opcion === "")
          );
        if (isName || hasEmptyOption) {
            setQuestions(prevQuestions => {
                const updatedQuestions = prevQuestions.slice(0, -1);
                return updatedQuestions;
            });
        }
        console.log(isEditing ? 'Edit' : 'Create', isEditing ? { test: isEditing } : undefined)
        navigation.navigate(isEditing ? 'Edit' : 'Create', isEditing ? { test: isEditing } : undefined);

    }

    function handleNextQuestion (toRight) {

        if (toRight) {
            if (!isCompleted()) {
                return
            }

            if (questions.length-1 > QuestIndex) {
                navigation.navigate('Questions',{QuestIndex:QuestIndex + 1, isEditing})
                return
            }

            navigation.navigate('Questions',{QuestIndex:QuestIndex + 1, isEditing})
        } 
        else {
            navigation.navigate('Questions',{QuestIndex:QuestIndex - 1, isEditing})
        }
    }


    function isCompleted() {
        if (name === "") {
            ToastAndroid.show("Ingrese textualmente la pregunta", ToastAndroid.LONG);
            return false;
        }
        
        const hasEmptyOption = respuestas.some((response) => response.opcion === "")
        
        if (hasEmptyOption) {
            console.log(hasEmptyOption)
            ToastAndroid.show("Rellene todas las opciones disponibles", ToastAndroid.LONG);
            return false;
        }
    
        return true;
    }

    

    function setCorrecta(index) {
        const newRespuestas = respuestas.map((response, i) => ({
            ...response,
            isTrue: i === index
        }));
    
        setRespuestas(newRespuestas);
    }
    
    

    const styles = dynamicStyles(Colors);

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: Colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={{ paddingTop: 45, }}>
                <View>
                    <View>
                        <TouchableOpacity>
                            
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContainer, {paddingHorizontal: 20}]}>
                        <Text style={[styles.label,{fontSize:18}]}>Pregunta</Text>
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
                        {respuestas?.map((response, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={styles.label}>Opción {alphabet[index]}</Text>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <TextInput 
                                        value={response.opcion}
                                        placeholderTextColor={Colors.label}
                                        onChangeText={(value) => handleResponse(value, index)}
                                        style={styles.questionInput}
                                        placeholder='Ingresar Opción...'
                                    />
                                    <View style={{alignItems:"center"}}>
                                        <TouchableOpacity style={{alignItems:"center"}} onPress={() => setCorrecta(index)}>
                                            <Text style={{fontSize:10, color:Colors.text}}>Correcta</Text>
                                            <Checkbox
                                                value={response.isTrue}
                                                onValueChange={() => setCorrecta(index)}
                                                style={{ margin: 5, width: 25, height: 25 }} 
                                            />
                                        </TouchableOpacity>

                                        {(index == respuestas.length-1 && respuestas.length > 2) && (
                                            <TouchableOpacity style={{width:30, height:30, paddingTop:5}} onPress={handleDelete}>
                                                <Trash color={Colors.text} />
                                            </TouchableOpacity>
                                        )}
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
                    <View>
                        <Text style={[styles.label,{textAlign:"center"}]}>Pregunta Número:</Text>

                        <View style={styles.indexContainer}>
                            <View style={styles.sideButtons}>
                                {QuestIndex > 0 && (
                                    <TouchableOpacity onPress={() => handleNextQuestion(false)}>
                                        <LeftArrow color={Colors.text} size={30}/>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <Text style={styles.currentIndex}>{questIndex+1}/{questions.length}</Text>

                            <View style={styles.sideButtons}>
                                <TouchableOpacity onPress={() => handleNextQuestion(true)}>
                                    <Plus color={Colors.text} size={30}/>
                                </TouchableOpacity>
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

const dynamicStyles = (Colors) => StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#878787",
        color: Colors.text,
        paddingLeft: 20
    },
    questionInput: {
        width: 255,
        height: 40,
        fontSize: 16,
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
        height: 90,
    },
    outContainer: {
        paddingBottom: 30,
        alignItems: "center",
        marginTop: 60
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
        fontSize: 20,
        marginBottom: 20
    },
    sideButtons: {
        width: 30,
        height: 30,
        alignItems: "center",
    },
    currentIndex: {
        color: Colors.text,
        fontSize: 25
    },
    indexContainer: {
        justifyContent: "space-evenly",
        width,
        alignItems: "center",
        paddingHorizontal: "20%",
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: "row",
    },
    addResponse: {
        justifyContent: "center",
        alignItems: "center",
        height: 80,
        marginTop:20
    },
    responsesContainer: {
        backgroundColor: Colors.transparentGreen,
        paddingHorizontal: 15,
        elevation:8,
        borderRadius: 15,
        marginHorizontal: 10
    }
});
