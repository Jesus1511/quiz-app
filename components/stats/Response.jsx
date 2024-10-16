import { StyleSheet, Text, View, useColorScheme, ScrollView, Image } from 'react-native'
import useColors from '../../utils/Colors'
import CheckIcon from '../../assets/images/checkIcon.png'
import XIcon from '../../assets/images/XIcon.png'

const Response = ({route}) => {

    const examen = route.params.exam
    console.log(route.params.exam.fails)

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <ScrollView style={{flex:1, backgroundColor:Colors.background}}>
        <View style={{height:30}}/>
      {examen.fails.map((fail, index) => (
        <View  style={styles.card} key={index}>
            <Text style={styles.h1}>{fail.pregunta}</Text>
            <View style={{flexDirection:"row", alignItems:"space-evenly"}}>
                <View style={styles.opContainer}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{fontSize:16, fontWeight:"bold" ,marginRight:5}}>Opción Correcta</Text>
                      <Image style={{width:20, height:20}} source={CheckIcon}/>
                    </View>
                    <Text style={{textAlign:"center"}}>
                      {fail.opciones.filter((op) => op.isTrue === true)[0]?.opcion || 'No true option found'}
                    </Text>
                </View>
                <View style={styles.opContainer}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{fontSize:16, fontWeight:"bold" ,marginRight:5}}>Tu Respuesta</Text>
                      <Image style={{width:20, height:20}} source={XIcon}/>
                    </View>
                    {console.log("fail")}
                    {console.log(fail)}
                    <Text style={{textAlign:"center"}}>{fail.opcion}</Text>
                </View>
            </View>
        </View>
      ) )}
        <View style={{height:80}}/>
    </ScrollView>
  )
}

export default Response

const DynamicStyles = (Colors) => StyleSheet.create({

    card: {
        backgroundColor: Colors.transparentGreen,
        marginHorizontal:15,
        marginVertical:10,
        borderRadius:20,
        padding:10,
        elevation:5,
        justifyContent:"center",
        alignItems:"center",
    },

    h1: {
        fontSize:20,
        textAlign:"center",
        marginBottom:8
    },

    opContainer: {
        alignItems:"center",
        width:"50%"
    }

})