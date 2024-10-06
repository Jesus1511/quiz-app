import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Dimensions, AppState, Easing } from 'react-native';
import useColors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; 
import { Close, Check } from '../../assets/images/Icons';
import { alphabet } from '../../utils/Consts';
import TimingModal from './TimingModal';

import { useContext } from 'react';
import { AppContext } from '../../localStorage/LocalStorage';

const { width, height } = Dimensions.get("window");

const Questions = ({ route }) => {
  const [question, setQuestion] = useState(null);
  const [responseColor, setResponseColor] = useState({ question: null, isTrue: false });
  const [QuestIndex, setQuestIndex] = useState(null);

  const { setIntento, setFailedQuests } = useContext(AppContext)

  const isDark = useColorScheme() == 'dark';
  const Colors = useColors(isDark);
  const navigation = useNavigation();

  const { Index, mode, orden, test } = route.params;
  const { preguntas } = route.params.test;

  const { currentTime, isEnd, setRunning, isTenPorcent } = TimingModal({ maxTime: test.tiempo, Index });

  const barWidth = useRef(new Animated.Value(0)).current
  const [opacity] = useState(new Animated.Value(0)); 
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentTime > 0) { 
      Animated.timing(barWidth, {
        toValue: Math.min(((currentTime / test.tiempo) * 100) * 2.75, 270),
        duration: 250,
        useNativeDriver: false,  // Cambiado a false
      }).start();
      
    } else {
      
      barWidth.setValue(0);
    }
  }, [currentTime]);
  
  useEffect(() => {
    if (isTenPorcent) { 
      Animated.timing(colorAnimation, {
        toValue: 1,  
        duration: (currentTime * 0.1) * 1000,  
        useNativeDriver: false, 
      }).start();
    } else {
      colorAnimation.setValue(0)
    }
  }, [isTenPorcent]);

  useEffect(() => {
    if (isEnd) {
      playSound(false);

      setIntento((intento) => {
        return [...intento, {isCorrect: false, time:test.tiempo}]
      })

      saveFails()
      changeQuest()

    }
  }, [isEnd]);

  useEffect(() => {
    if (mode === "random" && orden && orden[Index - 1] !== undefined) {
      setQuestIndex(orden[Index - 1]);
    } else {
      setQuestIndex(Index);
    }

    // Animar la opacidad al mostrar nuevos elementos
    Animated.timing(opacity, {
      toValue: 1, // Se anima hasta opacidad 1
      duration: 250, // Duración de la animación
      useNativeDriver: true,
    }).start();
  }, [route]);

  const [sound, setSound] = useState();

  async function playSound(isCorrect) {
    const soundFile = isCorrect ? require('../../assets/correct.mp3') : require('../../assets/incorrect.mp3');
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  function handleResponse(response, index) {
    if (responseColor.question == null) {
      setRunning(false)
      const newResponse = { question: index, isTrue: response };
      setResponseColor(newResponse);
  
      playSound(response);

      setIntento((intento) => {
        return [...intento, {isCorrect: newResponse.isTrue, time:currentTime}]
      })

      if (!response) {
        saveFails()
      }
      
      changeQuest()
      
  }
}

 function saveFails () {
  setFailedQuests(prev => {
    const existingFail = prev.find(fail => fail.index === question.index);

    if (existingFail) {
      return prev.map(fail => 
        fail.index === question.index ? { ...fail, count: fail.count + 1 } : fail
      );
    } else {
      return [...prev, { ...question, count: 1 }];
    }
  });

 }

function changeQuest () {
  setTimeout(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      if (Index < preguntas.length) {
        navigation.navigate('AnswerQuestions', { Index: Index + 1, test, mode, orden });
      } else {
        navigation.navigate('QuestEnd', { test: route.params.test });
      }
    });
  }, 500);
}
  
  function calculateColor(index, isTrue) {
    if (responseColor.question == index && responseColor.isTrue) {
      return Colors.winnerGreen;
    } else if (responseColor.question == index && !responseColor.isTrue) {
      return Colors.red;
    } else if (index !== responseColor.question && isTrue && responseColor.question !== null) {
      return Colors.winnerGreen;
    } else {
      return Colors.green3;
    }
  }

  useEffect(() => {
    if (QuestIndex) {
      setQuestion(preguntas[QuestIndex - 1]);
    }
    setResponseColor({ question: null, isTrue: false });

    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true, 
    }).start();
  }, [QuestIndex]);

  function getFontSize(text) {
    const length = text.length;
    if (length < 10) return 25;
    if (length < 50) return 20;
    if (length < 150) return 18;
    return 15; // Tamaño mínimo para textos largos
  }

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('La app ha vuelto al primer plano');
      }
      if (nextAppState === 'background') {
        navigation.goBack()
        setIntento([])
      }
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, [appState]);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1], 
    outputRange: [Colors.green, Colors.red], 
  });

  const styles = DynamicStyles(Colors);

  return (
    <ScrollView style={styles.main}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <View style={styles.bar}>
          <Animated.View style={[styles.barContent, { width: barWidth, backgroundColor}]} />
        </View>
        <Text style={{ color: Colors.text, fontSize: 25, fontFamily: "Montserrat-Bold" }}>N° {QuestIndex}</Text>
      </View>

      <Text style={{ color: Colors.text, fontSize: 30, marginTop: 20, textAlign: "center", marginTop: 20 }}>
        {question?.pregunta}
      </Text>

      <Animated.View style={[styles.questions, { opacity }]}>
        {question?.opciones.map((opcion, index) => (
          <View key={index} style={{ width, flexDirection: "row", alignItems: "top", justifyContent: "space-evenly" }}>
            <Text style={{ textAlign: "left", fontSize: 18, color: Colors.text, marginTop: 20, fontFamily: "Montserrat-Medium" }}>{alphabet[index]}</Text>
            <TouchableOpacity
              onPress={() => handleResponse(opcion.isTrue, index)}
              style={[
                styles.question,
                { backgroundColor: calculateColor(index, opcion.isTrue) },
              ]}
            >
              {responseColor.question !== null && opcion.isTrue && (
                <View style={{ position: "absolute", left: 8, top: 20 }}>
                  <Check color={Colors.text} size={35} />
                </View>
              )}
              {responseColor.question == index && !opcion.isTrue && (
                <View style={{ position: "absolute", left: 8, top: 20 }}>
                  <Close color={Colors.text} size={35} />
                </View>
              )}
              <Text style={[styles.questionText, { fontSize: getFontSize(opcion.opcion) }]}>{opcion.opcion}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default Questions;

const DynamicStyles = (Colors) =>
  StyleSheet.create({
    main: {
      backgroundColor: Colors.background,
      flex: 1,
      paddingTop: 25,
    },
    bar: {
      width: 270,
      height: 25,
      borderRadius: 20,
      backgroundColor: Colors.bar,
      overflow: "hidden",
    },
    barContent: {
      height: 25,
      borderRadius: 20,
    },
    questions: {
      alignItems: "center",
      marginTop: 30,
    },
    question: {
      backgroundColor: Colors.green,
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 35,
      width: "86%",
      marginVertical: 10,
    },
    questionText: {
      color: Colors.text,
      fontSize: 25,
      textAlign: "center",
      fontFamily: "Montserrat-SemiBold",
    },
  });
