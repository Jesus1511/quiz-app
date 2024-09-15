import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import useColors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const QuestEnd = () => {
    const isDark = useColorScheme() == 'dark'
    const Colors = useColors(isDark)
    const navigation = useNavigation()
    const styles = DynamicStyles(Colors)

    const [animationCompleted, setAnimationCompleted] = useState(false)

    // Crear referencias animadas para cada "stat"
    const opacityValues = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
    ]).current

    useEffect(() => {
        // Animar las vistas una por una
        opacityValues.forEach((value, index) => {
            Animated.timing(value, {
                toValue: 1,
                duration: 500, // Duración de cada animación
                delay: index * 500, // Retardo progresivo para que aparezcan una tras otra
                useNativeDriver: true
            }).start()
        })
    }, [])

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>¡Felicidades!</Text>
                <Text style={styles.subHeaderText}>Completaste el examen con un: "dato"</Text>
            </View>
            <ScrollView style={styles.statsContainer}>
                {/* Estadísticas con animación */}
                <Animated.View style={[styles.stat, { opacity: opacityValues[0] }]}>
                    <Text style={styles.statTitle}>Porcentaje de Acierto</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.bar}>
                            <View style={styles.barContent} />
                        </View>
                        <Text style={styles.statValue}>tanto%</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.stat, { opacity: opacityValues[1] }]}>
                    <Text style={styles.statTitle}>Mejora Respecto a tu mejor nota</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.bar}>
                            <View style={styles.barContent} />
                        </View>
                        <Text style={styles.statValue}>tanto%</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.stat, { opacity: opacityValues[2] }]}>
                    <Text style={styles.statTitle}>Tiempo Promedio por pregunta</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>"new time" / "old time"</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.stat, { opacity: opacityValues[3] }]}>
                    <Text style={styles.statTitle}>Mejora respecto a tu mejor tiempo</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.bar}>
                            <View style={styles.barContent} />
                        </View>
                        <Text style={styles.statValue}>tanto%</Text>
                    </View>
                </Animated.View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuestEnd

const DynamicStyles = (Colors) => StyleSheet.create({
    main: {
        backgroundColor: Colors.background,
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: Colors.text,
        fontSize: 32,
        fontFamily: 'Montserrat-Bold',
    },
    subHeaderText: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        marginTop: 5,
    },
    statsContainer: {
        flex: 1,
        marginVertical: 20,
    },
    stat: {
        marginBottom: 25,
    },
    statTitle: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bar: {
        width: '80%',
        height: 25,
        borderRadius: 20,
        backgroundColor: Colors.bar,
        overflow: 'hidden',
    },
    barContent: {
        height: 25,
        width: '40%', // Cambia este valor dinámicamente según el porcentaje
        borderRadius: 20,
        backgroundColor: Colors.green,
    },
    statValue: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
    },
    timeContainer: {
        alignItems: 'center',
    },
    timeText: {
        color: Colors.text,
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    button: {
        backgroundColor: Colors.green,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
    },
})
