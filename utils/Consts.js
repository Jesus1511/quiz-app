export const preguntas = [
    {
        index: 1, 
        pregunta: "¿Cuál es la capital de Venezuela?", 
        opciones: [
            {isTrue: false, opcion: "Delta Amacuro"},
            {isTrue: true, opcion: "Caracas"},
            {isTrue: false, opcion: "Barcelona"},
            {isTrue: false, opcion: "Barinas"}
        ]
    },
    {
        index: 2, 
        pregunta: "¿Cuál es el planeta más grande del sistema solar?", 
        opciones: [
            {isTrue: true, opcion: "Júpiter"},
            {isTrue: false, opcion: "Saturno"},
            {isTrue: false, opcion: "Tierra"},
            {isTrue: false, opcion: "Neptuno"}
        ]
    },
    {
        index: 3, 
        pregunta: "¿Quién escribió 'Cien años de soledad'?", 
        opciones: [
            {isTrue: true, opcion: "Gabriel García Márquez"},
            {isTrue: false, opcion: "Julio Cortázar"},
            {isTrue: false, opcion: "Mario Vargas Llosa"},
            {isTrue: false, opcion: "Carlos Fuentes"}
        ]
    },
    {
        index: 4, 
        pregunta: "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?", 
        opciones: [
            {isTrue: true, opcion: "1776"},
            {isTrue: false, opcion: "1783"},
            {isTrue: false, opcion: "1800"},
            {isTrue: false, opcion: "1750"}
        ]
    },
    {
        index: 5, 
        pregunta: "¿Cuál es el océano más grande del mundo?", 
        opciones: [
            {isTrue: true, opcion: "Océano Pacífico"},
            {isTrue: false, opcion: "Océano Atlántico"},
            {isTrue: false, opcion: "Océano Índico"},
            {isTrue: false, opcion: "Océano Ártico"}
        ]
    }
];




export const exams = [
    {name:"Examen super importante",   categoria: "Matematicas", preguntas, intentos: [{nota: 20, bestTime:78, date: "Date.now()",},{nota: 19, bestTime:79, date: "Un fecha"}], tiempo: 6},

    {name:"Examen super importante 2", categoria:"Castellano", preguntas, intentos: [], tiempo: 6, fails:[]},

    {name:"Examen super importante 3", categoria:"Leyes", preguntas, intentos: [{nota: 25, bestTime:34, date: "Un fecha"}], tiempo: 40}

]

export const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
