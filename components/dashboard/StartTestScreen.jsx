import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Animated, Dimensions, ToastAndroid} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import useColors from '../../utils/Colors'
import { globalStyles } from '../../Styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from '../../utils/bestTry'
import { preguntas } from '../../utils/Consts'

const {width, height} = Dimensions.get('window')

const StartTestScreen = ({route}) => {

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

    const styles = DynamicStyles(Colors)

  return (
      <View style={{paddingTop:30, flex:1, backgroundColor:Colors.background}}>
        <ScrollView>  
        <View style={styles.examsContainer}>

           <View   style={styles.exam}>
               {test.intentos.length < 1 && (
                   <View style={styles.newPoint}/>
             )}

               <Text style={styles.examProps}>Categoria: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{test.categoria}</Text></Text>
               <Text style={styles.examProps}>Preguntas: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{test.preguntas.length}</Text></Text>
               <Text style={styles.examProps}>Duración: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{Math.floor((test.tiempo*test.preguntas.length)/60)} min</Text></Text>

               <Text style={styles.examProps}>Fails: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{JSON.stringify(test.fails[0]?.count)}</Text></Text>
         </View>

          {test.intentos.length >= 1 && (
          <View>
          <Text style={{fontSize:20, marginBottom:20, fontFamily:"Montserrat-SemiBold", color:Colors.text, textAlign:"center"}}>Pruebas Anteriores</Text>
          {test.intentos.slice().reverse().map((intento, index) => (
            index < 3 && (
              <View style={styles.intento} key={index}>
                <View style={styles.textasoContainer}>
                  <Text style={styles.textasoTitulo}>Fecha</Text>
                  <Text style={[styles.textaso, {maxWidth:120}]}>{formatDate(intento.date)}</Text>
                </View>
                <View style={styles.textasoContainer}>
                  <Text style={styles.textasoTitulo}>Nota</Text>
                  <Text style={styles.textaso}>{Math.ceil((intento.nota * test.preguntas.length) / 100)}/{test.preguntas.length}</Text>
                </View>
                <View style={styles.textasoContainer}>
                  <Text style={styles.textasoTitulo}>Tiempo</Text>
                  <Text style={styles.textaso}>{intento.bestTime?.toFixed(2)} secs</Text>
                </View>
              </View>
            )
          ))}
      </View>
        )}

            
        </View>
      </ScrollView>
      <View style={{alignItems:"center", paddingBottom: 30}}>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={[globalStyles.GreenButton, {elevation:20}]}>
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

  const [open, setOpen] = useState(false);
  
  // Animación para la altura
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      // Cuando se abre, animamos a 80 de altura
      Animated.timing(heightAnim, {
        toValue: 120,
        duration: 100, // Duración de la animación
        useNativeDriver: false, // No puede ser true, ya que animamos height
      }).start();
    } else {
      // Cuando se cierra, la altura vuelve a 0
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [open, heightAnim]);

  const styles = DynamicStyles(Colors);

  function generateRandomArray(num) {
    const arr = Array.from({ length: num }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    } 
    return arr;
  }

  return (
    <>
      <View style={[styles.questionsMenu, { backgroundColor: Colors.green,}]}>
        <View style={{height:300, width, justifyContent: 'space-evenly', alignItems: 'center', marginBottom:5}}>
          <TouchableOpacity
            onPress={() => {
              setIsMenuOpen(false);
              navigation.navigate('AnswerQuestions', { Index: 1, test, mode: "random", orden: generateRandomArray(test.preguntas.length) });
            }}
            style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
          >
            <Text style={[styles.menuTexts, { color: Colors.text }]}>Modo Aleatorio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              setIsMenuOpen(false);
              navigation.navigate('AnswerQuestions', { Index: 1, test, mode: "complete", orden: null });
            }}
            style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
          >
            <Text style={[styles.menuTexts, { color: Colors.text }]}>Examen Completo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (test.intentos.length >= 1 && test.fails.length >= 1) {
                //setIsMenuOpen(false)
                //navigation.navigate('AnswerQuestions', { Index: 1, test: {...test, preguntas:test.fails}, mode:"focus", orden:null });
                setOpen(!open);
              } else if (test.intentos.length > 1 && test.fails.length < 1) {
                ToastAndroid.show("No haz cometido ningun error anteriormente en este examen, felicidades", ToastAndroid.LONG);
              }  else {
                ToastAndroid.show("Debes realizar el test al menos una vez para hacerlo en modo enfocado", ToastAndroid.LONG);
              }
            }}
            style={[styles.menuButtons, { backgroundColor: Colors.darkGreen }]}
          >
            <Text style={[styles.menuTexts, { color: Colors.text}]}>Examen Enfocado</Text>
          </TouchableOpacity>
        </View>
        {/* Animamos este View con el height controlado */}
        <Animated.View style={{ height: heightAnim, width,}}>
          <Text style={[styles.menuTexts, { color: Colors.text, marginBottom:15 }]}>Solo con preguntas falladas...</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                const filteredFails = test.fails.filter(item => item.count > 0 && item.count < 4);
                if (filteredFails.length < 1) {
                  ToastAndroid.show("no haz fallado ninguna pregunta entre 1 y 3 veces", ToastAndroid.SHORT)
                  return
                }
                navigation.navigate('AnswerQuestions', { Index: 1, test: { ...test, preguntas: filteredFails }, mode: "focus", orden: null });
                setIsMenuOpen(false);
                setOpen(!open);
              }}
              style={[styles.miniMenuButtons, { backgroundColor: Colors.darkGreen }]}
            >
              <Text style={[styles.menuTexts, { color: Colors.text }]}>1 - 3 veces</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                const filteredFails = test.fails.filter(item => item.count >= 3 && item.count < 6);
                if (filteredFails.length < 1) {
                  ToastAndroid.show("No haz fallado ninguna pregunta entre 3 y 5 veces", ToastAndroid.SHORT)
                  return
                }
                navigation.navigate('AnswerQuestions', { Index: 1, test: { ...test, preguntas: filteredFails }, mode: "focus", orden: null });
                setIsMenuOpen(false);
                setOpen(!open);
              }}
              style={[styles.miniMenuButtons, { backgroundColor: Colors.darkGreen }]}
            >
              <Text style={[styles.menuTexts, { color: Colors.text }]}>3 - 5 veces</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                const filteredFails = test.fails.filter(item => item.count >= 5);
                if (filteredFails.length < 1) {
                  ToastAndroid.show("No haz fallado ninguna pregunta +5 veces", ToastAndroid.SHORT)
                  return
                }
                navigation.navigate('AnswerQuestions', { Index: 1, test: { ...test, preguntas: filteredFails }, mode: "focus", orden: null });
                setIsMenuOpen(false);
                setOpen(!open);
              }}
              style={[styles.miniMenuButtons, { backgroundColor: Colors.darkGreen }]}
            >
              <Text style={[styles.menuTexts, { color: Colors.text }]}>+5  veces</Text>
            </TouchableOpacity>
          </View>


        </Animated.View>
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
      width:330,
      borderRadius:15,
      justifyContent:"start",
      flexDirection: "row",
      paddingLeft:10
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
    miniMenuButtons: {
      height: 75,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      elevation: 7,
    },
    menuTexts: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      textAlign: 'center',
    },
    questionsMenu: {
      width,
      paddingVertical:15,
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