import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import useColors from '../../utils/Colors'
import { useState, useEffect } from 'react'
import { exams } from '../../utils/Consts'

const Exams = () => {

    const [doneExams, setDoneExams] = useState(null)

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    useEffect(() => {
        let newExams = [];
        exams.forEach((exam) => {
          if ( exam.intentos.length >= 1) {
            newExams.push(exam);
          }
        });
        setDoneExams(newExams);
      }, [exams]);
      
      
    

    const styles = DynamicStyles(Colors)

  return (
    <View style={{marginTop:20}}>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>Exámenes Realizados</Text>
      </View>
      <View style={styles.examsContainer}>
        {doneExams?.map((exam, index) =>(
            <View style={styles.exam} key={index}>

                <Text style={styles.examName}>{exam.name}</Text>

                <Text style={styles.examProps}>Categoria: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{exam.categoria}</Text></Text>
                <Text style={styles.examProps}>Preguntas: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{exam.preguntas.length}</Text></Text>
                <Text style={styles.examProps}>Mejor Tiempo: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{exam.intentos[0].bestTime} sg</Text></Text>
                <Text style={styles.examProps}>Mejor Nota: <Text style={{color:Colors.text, fontFamily:"Montserrat-Medium"}}>{exam.intentos[0].nota}/{exam.preguntas.length}</Text></Text>
            </View>
        ) )}
      </View>
    </View>
  )
}


export default Exams

const DynamicStyles = (Colors) => StyleSheet.create({
    titulo: {
        color: Colors.text,
        fontSize:23,
        fontFamily:"Montserrat-SemiBold",
        textAlign:"center",
        width:"80%"
    },
    textContainer: {
        alignItems:"center",
        marginTop:30,
        marginBottom:20
    },
    examsContainer: {
        alignItems:"center"
    },
    exam: {
        backgroundColor: Colors.green2,
        width:"90%",
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:20,
        paddingBottom:30,
        marginBottom:20,
        elevation:5
    },
    examName: {
        fontSize:20,
        color:Colors.text,
        fontFamily:"Montserrat-SemiBold",
        marginBottom:10
    },
    examProps: {
        fontSize:17,
        color:Colors.blue,
        fontFamily:"Montserrat-SemiBold",
        marginBottom:2.5
    },

})