import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { ToastAndroid, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

const TestFunctions = () => {
  const [tests, setTests] = useState();

  // Función para generar un UUID
  async function generateRandomId() {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    let id = '';
    for (let i = 0; i < randomBytes.length; i++) {
      id += ('0' + randomBytes[i].toString(16)).slice(-2);
      if (i === 3 || i === 5 || i === 7 || i === 9) id += '-';
    }
    id = `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20, 32)}`;
    return id;
  }

  // Función para inicializar la base de datos y la tabla
  const initializeDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('database.db');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Test (
          id TEXT,
          tiempo INTEGER,
          name TEXT,
          categoria TEXT,
          preguntas TEXT,
          intentos TEXT
        );
      `);
      console.log("Tabla 'Test' creada");
    } catch (e) {
      console.log("Error al inicializar la base de datos:", e);
    }
  };

  // Función para crear un test
  const createTest = async (db, testData) => {
    try {
      const newId = await generateRandomId();
      console.log("newId:",newId)
      await db.runAsync(
        `INSERT INTO Test (id, tiempo, name, categoria, preguntas, intentos) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          newId,
          testData.tiempo,
          testData.name,
          testData.categoria,
          JSON.stringify(testData.preguntas),
          JSON.stringify(testData.intentos),
        ]
      );
      await getAllTests(db);
      console.log("Test creado");
    } catch (e) {
      console.log("Error al crear el test:", e);
    }
  };

  // Función para leer todos los tests
  const getAllTests = async (db) => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM Test');
      const updatedRows = rows.map((row) => ({
        ...row,
        preguntas: row.preguntas ? JSON.parse(row.preguntas) : [],
        intentos: row.intentos ? JSON.parse(row.intentos) : [],
      }));
      setTests(updatedRows);
      console.log("Tests obtenidos", updatedRows);
    } catch (e) {
      console.log("Error al obtener los tests:", e);
    }
  };

  // Función para actualizar un test
  const updateTest = async (db, id, updatedData) => {
    try {
      console.log("Generando ID:", id.toString());
      // Verifica si el ID existe en la base de datos antes de intentar actualizar
      const checkId = await db.getFirstAsync(
        `SELECT id FROM Test WHERE id = ?`,
        [id]
      );
  
      if (!checkId) {
        ToastAndroid.show("Test no encontrado", ToastAndroid.SHORT);
        return;
      }
  
      await db.runAsync(
        `UPDATE Test SET tiempo = ?, name = ?, categoria = ?, preguntas = ?, intentos = ? WHERE id = ?`,
        [
          updatedData.tiempo,
          updatedData.name,
          updatedData.categoria,
          JSON.stringify(updatedData.preguntas),
          JSON.stringify(updatedData.intentos),
          id
        ]
      );
  
      ToastAndroid.show("Test actualizado", ToastAndroid.LONG);
      await getAllTests(db);
    } catch (e) {
      Alert.alert("Error al actualizar el test:", e.message);
    }
  };
  
// Función para actualizar un test
const updateTrys = async (db, id, updatedData) => {
  try {
    console.log("Generando ID:", id.toString());

    const test = await db.getFirstAsync(
      `SELECT intentos FROM Test WHERE id = ?`,
      [id]
    );

    if (!test) {
      ToastAndroid.show("Test no encontrado", ToastAndroid.SHORT);
      return;
    }

    const oldIntentos = JSON.parse(test.intentos || "[]");

    const newIntentos = [...oldIntentos, updatedData];

    await db.runAsync(
      `UPDATE Test SET intentos = ? WHERE id = ?`,
      [
        JSON.stringify(newIntentos),
        id
      ]
    );
    await getAllTests(db);
  } catch (e) {
    Alert.alert("Error al actualizar el test:", e.message);
  }
};


  const deleteTest = async (db, id) => {
    try {
      console.log("Generando ID:", id.toString());
      // Verifica si el ID existe en la base de datos antes de intentar eliminarlo
      const checkId = await db.getFirstAsync(
        `SELECT id FROM Test WHERE id = ?`,
        [id]
      );
  
      if (!checkId) {
        ToastAndroid.show("Test no encontrado", ToastAndroid.SHORT);
        return;
      }
  
      await db.runAsync(
        `DELETE FROM Test WHERE id = ?`,
        [id]
      );
  
      ToastAndroid.show("Test eliminado", ToastAndroid.LONG);
      await getAllTests(db);
    } catch (e) {
      Alert.alert("Error al eliminar el test:", e.message);
    }
  };
  

  // Función para eliminar todos los tests
  const deleteAllTests = async (db) => {
    try {
      await db.runAsync(`DELETE FROM Test`);
      console.log("Todos los tests eliminados");
      await getAllTests(db); // Actualizar la lista de tests después de eliminarlos
    } catch (e) {
      console.log("Error al eliminar todos los tests:", e);
    }
  };

  return {
    initializeDatabase,
    createTest,
    updateTest,
    deleteTest,
    getAllTests,
    deleteAllTests,
    generateRandomId,
    updateTrys,
    tests,
  };
};

export default TestFunctions;