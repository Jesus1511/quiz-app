import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import useColors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Importa Audio de expo-av

import {Close, Check} from '../../assets/images/Icons'
import { alphabet } from '../../utils/Consts';

const {width, height} = Dimensions.get("window")

const Questions = ({ route }) => {
  const [question, setQuestion] = useState(null);
  const isDark = useColorScheme() == 'dark';
  const Colors = useColors(isDark);
  const [responseColor, setResponseColor] = useState({ question: null, isTrue: false });
  const navigation = useNavigation();
  const { QuestIndex } = route.params;
  const { preguntas } = route.params.test;

  const [sound, setSound] = useState(); // Estado para almacenar el sonido

  // Función para reproducir sonido
  async function playSound(isCorrect) {
    const soundFile = isCorrect ? require('../../assets/correct.mp3') : require('../../assets/incorrect.mp3');
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  }

  // Liberar el sonido cuando ya no se necesite
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function handleResponse(response, index) {
    const newResponse = { question: index, isTrue: response };
    setResponseColor(newResponse);

    // Reproduce el sonido según la respuesta
    playSound(response);

    setTimeout(() => {
      if (preguntas.length !== QuestIndex) {
        navigation.navigate('AnswerQuestions', { QuestIndex: QuestIndex + 1, test: route.params.test });
      } else {
        navigation.navigate('QuestEnd', { test: route.params.test });
      }
    }, 1000);
  }

  function calculateColor(index, isTrue) {
    if (responseColor.question == index && responseColor.isTrue) {
      return Colors.winnerGreen
    } else if (responseColor.question == index && !responseColor.isTrue) {
      return Colors.red
    } else if (index !== responseColor.question && isTrue && responseColor.question !== null) {
      return Colors.winnerGreen
    } else {
      return Colors.green3
    }
  }

  useEffect(() => {
    setQuestion(preguntas[QuestIndex - 1]);
    setResponseColor({ question: null, isTrue: false });
  }, [route]);

  const styles = DynamicStyles(Colors);

  return (
    <ScrollView style={styles.main}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <View style={styles.bar}>
          <View style={styles.barContent} />
        </View>
        <Text style={{ color: Colors.text, fontSize: 25, fontFamily: "Montserrat-Bold" }}>N° {QuestIndex}</Text>
      </View>
      <Text style={{ color: Colors.text, fontSize: 30, marginTop: 20, textAlign: "center", marginTop: 20 }}>
        {question?.pregunta}
      </Text>
      <View style={styles.questions}>
        {question?.opciones.map((opcion, index) => (
          <View key={index} style={{width, flexDirection:"row", alignItems:"top", justifyContent:"space-evenly"}}>
            <Text style={{textAlign:"left",fontSize:18, color:Colors.text, marginTop:20, fontFamily:"Montserrat-Medium"}}>{alphabet[index]} )</Text>
            {console.log(calculateColor(index, opcion.isTrue))}
            <TouchableOpacity
              onPress={() => handleResponse(opcion.isTrue, index)}

              style={[
                styles.question,
                { backgroundColor: calculateColor(index, opcion.isTrue)},
              ]}
            >

              {responseColor.question !== null && opcion.isTrue && (
                <View style={{position:"absolute", left:10, top:20}}>
                  <Check color={Colors.text} size={40}/>
                </View>
              )}
              {responseColor.question == index && !opcion.isTrue && (
                <View style={{position:"absolute", left:10, top:20}}>
                  <Close color={Colors.text} size={40}/>
                </View>
              )}

              <Text style={styles.questionText}>{opcion.opcion}</Text>
            </TouchableOpacity>
          </View>

        ))}
      </View>
      <View style={{height:100}}/>
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
      width: "40%",
      borderRadius: 20,
      backgroundColor: Colors.green,
    },
    questions: {
      alignItems: "center",
      marginTop: 30,
    },
    question: {
      backgroundColor: Colors.green,
      borderRadius: 15,
      padding: 20,
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
