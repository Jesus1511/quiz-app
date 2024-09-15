import { StyleSheet, Text, View, useColorScheme, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useContext } from 'react'
import useColors from '../../utils/Colors'
import { AppContext } from '../../localStorage/LocalStorage'
import { useNavigation } from '@react-navigation/native'

const Exams = () => {

    const navigation = useNavigation()
    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const {tests} = useContext(AppContext)

    function handleNavigate(test) {
        navigation.navigate('StartTest', { test })
    }

    const styles = DynamicStyles(Colors)

    return (
        <View style={{ marginTop: 100 }}>
            <View style={styles.examsContainer}>
                {tests?.length >= 1 ? (
                    tests.map((exam, index) => (
                        <ExamCard
                            key={index}
                            exam={exam}
                            handleNavigate={handleNavigate}
                            Colors={Colors}
                        />
                    ))
                ) : (
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: "center", color: Colors.text, fontSize: 15 }}>No existe ningun examen aún</Text>
                    </View>
                )}

                <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                    <Text style={{ textAlign: "center", color: Colors.blue2, fontSize: 15, marginTop: 20 }}>Crear Examen +</Text>
                </TouchableWithoutFeedback>
                <View style={{ height: 60 }} />
            </View>
        </View>
    )
}

// Componente separado para manejar la animación
const ExamCard = ({ exam, handleNavigate, Colors }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.98,  // Reduce el tamaño
            useNativeDriver: true,
        }).start();
    }

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,  // Regresa al tamaño normal
            useNativeDriver: true,
        }).start();
    }

    const styles = DynamicStyles(Colors)

    return (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => handleNavigate(exam)}
        >
            <Animated.View style={[styles.examWrapper, { transform: [{ scale: scaleValue }] }]}>
                {/* Sombra 3D */}
                <Animated.View style={[styles.examShadow, { transform: [{ scale: scaleValue }] }]} />
                {/* Botón real */}
                <View style={styles.exam}>
                    <Text style={styles.examName}>{exam.name}</Text>
                    {exam.intentos.length < 1 && (
                        <View style={styles.newPoint} />
                    )}

                    <Text style={styles.examProps}>Categoria: <Text style={{ color: Colors.text, fontFamily: "Montserrat-Medium" }}>{exam.categoria}</Text></Text>
                    <Text style={styles.examProps}>Preguntas: <Text style={{ color: Colors.text, fontFamily: "Montserrat-Medium" }}>{exam.preguntas.length}</Text></Text>
                    <Text style={styles.examProps}>Duración: <Text style={{ color: Colors.text, fontFamily: "Montserrat-Medium" }}>{Math.floor((exam.tiempo * exam.preguntas.length) / 60)} min</Text></Text>
                    {exam.intentos.length >= 1 && (
                        <Text style={styles.examProps}>Mejor Nota: <Text style={{ color: Colors.text, fontFamily: "Montserrat-Medium" }}>{exam.intentos[0].nota}/{exam.preguntas.length}</Text></Text>
                    )}
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

export default Exams

const DynamicStyles = (Colors) => StyleSheet.create({
    examsContainer: {
        alignItems: "center",
        paddingTop: 20
    },
    examWrapper: {
        width: "85%",
        marginBottom: 20,
        position: "relative",
    },
    examShadow: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: Colors.darkGreen,
        borderRadius: 20,
        top: 7,
        zIndex: -1
    },
    exam: {
        backgroundColor: Colors.green2,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingRight: 30,
        borderRadius: 20,
        zIndex: 1,
    },
    examName: {
        fontSize: 18,
        color: Colors.text,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 10
    },
    examProps: {
        fontSize: 16,
        color: Colors.blue,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 2.5
    },
    newPoint: {
        width: 9,
        height: 9,
        backgroundColor: Colors.bluePoint,
        borderRadius: 100,
        position: "absolute",
        right: 15,
        top: 22
    }
})
