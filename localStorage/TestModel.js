// TestModel.js
const PreguntaSchema = {
    name: "Pregunta",
    properties: {
      index: "int",
      pregunta: "string",
      opciones: "Opcion[]", // Usa una lista de objetos Opcion
    },
    primaryKey: "index",
  };
  
  const OpcionSchema = {
    name: "Opcion",
    properties: {
      isTrue: "bool",
      opcion: "string",
    },
  };
  
  const IntentoSchema = {
    name: "Intento",
    properties: {
      nota: "int",
      bestTime: "int",
      date: "date",
    },
  };
  
  const TestSchema = {
    name: "Test",
    properties: {
      id: "int", // Clave primaria
      tiempo: "int",
      name: "string",
      preguntas: "Pregunta[]", // Lista de objetos Pregunta
      intentos: "Intento[]",   // Lista de objetos Intento
      categoria: "string",
    },
    primaryKey: "id",
  };
  
  export { PreguntaSchema, OpcionSchema, IntentoSchema, TestSchema };
  