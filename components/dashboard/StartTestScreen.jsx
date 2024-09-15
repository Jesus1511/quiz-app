import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Animated, Dimensions} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import useColors from '../../utils/Colors'
import { globalStyles } from '../../Styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { preguntas } from '../../utils/Consts'

const {width, height} = Dimensions.get('window')

const StartTestScreen = ({route}) => {

    const navigation = useNavigation()
    const { test } = route.params

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const [isMenuOpen, setIsMenuOpen] = useState(null)
    const slideAnim = useRef(new Animated.Value(height)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

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

    function handleNavigate (test) {
        navigation.navigate('StartTest',{test})
    }

    const styles = DynamicStyles(Colors)

  return (
      <View style={{paddingTop:30, flex:1, backgroundColor:Colors.background}}>
        <ScrollView>  
        <View style={styles.examsContainer}>

           <View   style={styles.exam}>
               {!test.done && (
                   <View style={styles.newPoint}/>
             )}

               <Text style={styles.examProps}>Categoria: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{test.categoria}</Text></Text>
               <Text style={styles.examProps}>Preguntas: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{test.preguntas.length}</Text></Text>
               <Text style={styles.examProps}>Duración: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{Math.floor((test.tiempo*test.preguntas.length)/60)} min</Text></Text>
         </View>

          {test.intentos.length >= 1 && (
          <View>
          <Text style={{fontSize:20, marginBottom:20, fontFamily:"Montserrat-SemiBold", color:Colors.text, textAlign:"center"}}>Pruebas Anteriores</Text>
          {test.intentos.map((intento, index) => (
            <View style={styles.intento} key={index}>
              <View style={styles.textasoContainer}>
                <Text style={styles.textasoTitulo}>Fecha</Text>
                <Text style={styles.textaso}>24 enero 2024</Text>
              </View>
              <View style={styles.textasoContainer}>
                <Text style={styles.textasoTitulo}>Nota</Text>
                <Text style={styles.textaso}>{intento.nota}/{test.preguntas.length}</Text>
              </View>
              <View style={styles.textasoContainer}>
                <Text style={styles.textasoTitulo}>Tiempo</Text>
                <Text style={styles.textaso}>{intento.bestTime} minutos</Text>
              </View>
            </View>
          ))}
      </View>
        )}

            
        </View>
      </ScrollView>
      <View style={{alignItems:"center", paddingBottom: 30}}>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={[globalStyles.GreenButton, {elevation:5}]}>
          <Text style={{color:Colors.text, textAlign:"center", fontSize:20, fontFamily:"Montserrat-SemiBold"}}>Empezar Test</Text>
        </TouchableOpacity>
      </View>
      {isMenuOpen && (
        <>
          <Animated.View
            style={[styles.background, { opacity: opacityAnim }]}
            >
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={{ flex: 1 }} />
          </Animated.View>
          <Animated.View style={[styles.questionsMenu, { backgroundColor: Colors.green, transform: [{ translateY: slideAnim }] }]}>
            <MenuQuestions setIsMenuOpen={setIsMenuOpen} test={test} />
          </Animated.View>
        </>
      )}

    </View>
  )
}

const MenuQuestions = ({ test, setIsMenuOpen }) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark);

  const styles = DynamicStyles(Colors)

  return (
    <>
      <View style={[styles.questionsMenu, { backgroundColor: Colors.green }]}>
        <TouchableOpacity
          onPress={() => {
            setIsMenuOpen(false)
            navigation.navigate('AnswerQuestions', { QuestIndex: 1, test });
          }}
          style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
        >
          <Text style={[styles.menuTexts, { color: Colors.text }]}>Modo Aleatorio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsMenuOpen(false)
            navigation.navigate('AnswerQuestions', { QuestIndex: 1, test });
          }}
          style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
        >
          <Text style={[styles.menuTexts, { color: Colors.text }]}>Examen Completo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsMenuOpen(false)
            navigation.navigate('AnswerQuestions', { QuestIndex: 1, test });
          }}
          style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
        >
          <Text style={[styles.menuTexts, { color: Colors.text }]}>Examen Enfocado</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StartTestScreen

const DynamicStyles = (Colors) => StyleSheet.create({

    examsContainer: {
        alignItems:"center",
        paddingTop:20
    },
    exam: {
        width:"90%",
        paddingRight:30,
        borderRadius:20,
        marginBottom:20,
        paddingBottom:30,
    },
    examName: {
        fontSize:20,
        color:Colors.text,
        fontFamily:"Montserrat-SemiBold",
        marginBottom:10
    },
    examProps: {
        fontSize:20,
        color:Colors.blue,
        fontFamily:"Montserrat-SemiBold",
        marginBottom:10
    },
    newPoint: {
        width:9,
        height:9,
        backgroundColor:Colors.bluePoint,
        borderRadius:100,
        position:"absolute",
        right:17,
        top:22
    },
    intento: {
      backgroundColor:Colors.green,
      elevation:5,
      marginVertical:8,
      width:"90%",
      borderRadius:15,
      flexDirection: "row",
    },
    textasoTitulo: {
      fontSize:16,
      color:Colors.text,
      fontFamily:"Montserrat-SemiBold",
      textAlign:"center"
    },
    textaso: {
      fontSize:16,
      color:Colors.text,
      fontFamily:"Montserrat-Regular",
      textAlign:"center"
    },
    textasoContainer: {
      padding:12
    },
    menuButtons: {
      height: 75,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      elevation: 7
    },
    menuTexts: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      textAlign: 'center',
    },
    questionsMenu: {
      width,
      height: 400,
      paddingTop: 15,
      paddingBottom: 50,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    background: {
      backgroundColor: '#0000004a',
      width,
      height,
      position: 'absolute',
      top: -70,
      left: 0,
    },
})