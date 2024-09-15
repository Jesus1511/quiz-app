import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import {useContext} from 'react'
import useColors from '../../utils/Colors'

import { AppContext } from '../../localStorage/LocalStorage'

const Theresholds = () => {

    const { categorias } = useContext(AppContext);

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <View>
        <View style={styles.textContainer}>
            <Text style={styles.titulo}>Porcentaje de acierto por categoria</Text>
        </View>
        <View style={{paddingRight:20, paddingLeft:10}}>
            {categorias.map((categoria, index) => (
                <View style={styles.categoriasContainer} key={index}>
                    <Text style={styles.categoriaName}>{categoria.value}</Text>

                    <View style={styles.bar}>
                        <View style={[styles.barContent, {width: 2*categoria.thereshold}]}/>
                    </View>

                    <Text style={{color:Colors.text, marginLeft:5}}>{categoria.thereshold}%</Text>
                </View>
            ))}
        </View>
    </View>
  )
}

export default Theresholds

const DynamicStyles = (Colors) => StyleSheet.create({
    titulo: {
        color: Colors.text,
        fontSize:18,
        fontFamily:"Montserrat-SemiBold",
        textAlign:"center",
        width:"80%"
    },
    textContainer: {
        alignItems:"center",
        marginTop:110,
        marginBottom:20
    },
    categoriasContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:9
    },
    categoriaName: {
        color: Colors.blue,
        fontSize:14,
        width:95,
        textAlign:"center"
    },
    bar: {
        backgroundColor: Colors.bar,
        width:200,
        borderRadius:20,
        height:20,
        overflow:"hidden",
    },
    barContent: {
        backgroundColor:Colors.green,
        height:"100%",
        borderBottomStartRadius:20,
        borderTopStartRadius:20
    }
})