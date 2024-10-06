import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import useColors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'

import { getBestTrys } from '../../utils/bestTry'

import { useContext } from 'react'
import { AppContext } from '../../localStorage/LocalStorage'
import { useSQLiteContext } from 'expo-sqlite'

const QuestEnd = ({route}) => {
    const isDark = useColorScheme() == 'dark'
    const Colors = useColors(isDark)
    const navigation = useNavigation()
    const styles = DynamicStyles(Colors)

    const { test } = route.params
    const db = useSQLiteContext()

    const { intento, setIntento, updateTrys, failedQuests, setFailedQuests } = useContext(AppContext)

    console.log(intento)

    const [score, setScore] = useState(0)
    const [scoreImprove, setScoreImprove] = useState(0)
    const [time, setTime] = useState(0)
    const [timeInprove, setTimeInprove] = useState(0)

    useEffect(() => {
        let totalScore = 0
        let totalTime = 0

        intento.map((quest) => {
            if (quest.isCorrect) {
                totalScore = totalScore + 1
            }
            totalTime = totalTime + quest.time
        })
        totalTime = totalTime / intento.length

        setScore(totalScore)
        setTime(totalTime)

        if (test.intentos.length >= 1) {
            const {bestTime, bestScore} = getBestTrys(test.intentos)
            console.log("sss")
            console.log("sss")
            console.log("sss")
            console.log(calcularPorcentajeDiferencia(0,1))
            setScoreImprove(calcularPorcentajeDiferencia(((bestScore * intento.length) / 100), totalScore))
            setTimeInprove(calcularPorcentajeDiferencia(totalTime, bestTime))
        }
    },[intento])

    function calcularPorcentajeDiferencia(oldValue, newValue) {
        let oldValues = oldValue
        if (oldValue <= 0) {
            oldValues = 1
        }
        const difference = newValue - oldValue;
        const percentageDifference = (difference / oldValues) * 100;
        return percentageDifference;
    
    }



    function handleSave () {
        const newTry = { nota: (score / intento.length) * 100, bestTime: time, date: Date.now() };
        updateTrys(db, test.id ,newTry, failedQuests);        

        setIntento([]);
        setFailedQuests([])
        navigation.navigate('Home');
    }

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
            <Text style={styles.subHeaderText}>Completaste el examen con un:</Text>
            <Text style={styles.subHeaderText}>" {score} / {intento.length} "</Text>
        </View>
        <ScrollView style={styles.statsContainer}>
            {/* Estadísticas con animación */}
            <Animated.View style={[styles.stat, { opacity: opacityValues[0] }]}>
                <Text style={styles.statTitle}>Porcentaje de Acierto</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.bar}>
                        <View style={[styles.barContent, { width: `${(score / intento.length) * 100}%` }]} />
                    </View>
                    <Text style={styles.statValue}>{score} / {intento.length}</Text>
                </View>
            </Animated.View>
            {test.intentos.length >= 1 && (
                <Animated.View style={[styles.stat, { opacity: opacityValues[1] }]}>
                    <Text style={styles.statTitle}>Mejora Respecto a tu mejor nota</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.bar}>
                            {console.log(scoreImprove)}
                            <View style={[styles.barContent, { 
                                width: Math.max(scoreImprove, 0) < 0 ? 0 : Math.min(scoreImprove * 2.6, 100) 
                            }]} />
                        </View>
                        <Text style={styles.statValue}>{scoreImprove?.toFixed(0)}%</Text>
                    </View>
                </Animated.View>
            )}

            <Animated.View style={[styles.stat, { opacity: opacityValues[2] }]}>
                <Text style={styles.statTitle}>Tiempo Promedio por pregunta</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{time?.toFixed(2)}sg / {test.tiempo}sg</Text>
                </View>
            </Animated.View>
            {test.intentos.length >= 1 && (
                <Animated.View style={[styles.stat, { opacity: opacityValues[3] }]}>
                    <Text style={styles.statTitle}>Mejora respecto a tu mejor tiempo</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.bar}>
                            <View style={[styles.barContent, { 
                                width: (time > 0 && timeInprove / time >= 0) ? Math.min((timeInprove / time) * 2.6, 100) : 0 
                            }]} />
                        </View>
                        <Text style={styles.statValue}>{timeInprove?.toFixed(0)}%</Text>
                    </View>
                </Animated.View>
            )}
        </ScrollView>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
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
