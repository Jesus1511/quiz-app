import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { ToastAndroid, Alert } from 'react-native';

const TestFunctions = () => {
  const [tests, setTests] = useState();

  function generateRandomId() {
    const digits = 50;
    const randomNumber = BigInt('1' + '0'.repeat(digits - 1)) * BigInt(Math.floor(Math.random() * 10));
    return randomNumber;
  }

  // Función para inicializar la base de datos y la tabla
  const initializeDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('testDatabase.db');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Test (
          id TEXT PRIMARY KEY,
          tiempo INTEGER,
          name TEXT,
          categoria TEXT,
          preguntas TEXT,
          intentos TEXT
        );
      `);
      console.log("Tabla 'Test' creada");
      return db;
    } catch (e) {
      console.log("Error al inicializar la base de datos:", e);
    }
  };

  // Función para crear un test
  const createTest = async (db, testData) => {
    try {
      await db.runAsync(
        `INSERT INTO Test (id, tiempo, name, categoria, preguntas, intentos) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          generateRandomId(),
          testData.tiempo,
          testData.name,
          testData.categoria,
          JSON.stringify(testData.preguntas),
          JSON.stringify(testData.intentos)
        ]
      );
      getAllTests(db);
      console.log("Test creado");
    } catch (e) {
      console.log("Error al crear el test:", e);
    }
  };

  // Función para leer todos los tests
  const getAllTests = async (db) => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM Test');
      const updatedRows = rows.map(row => ({
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

  const updateTest = async (db, id, updatedData) => {
      ToastAndroid.show("updateTest is executing", ToastAndroid.SHORT);
      try {
          ToastAndroid.show("updateTest pre runAsync", ToastAndroid.SHORT);
          ToastAndroid.show("datos de la funcion:", ToastAndroid.SHORT);
          ToastAndroid.show(id.toString(), ToastAndroid.SHORT);
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
          ToastAndroid.show("updateTest post runAsync", ToastAndroid.SHORT);
          ToastAndroid.show("Test actualizado", ToastAndroid.LONG);
          getAllTests(db);
          ToastAndroid.show("post getAllTests", ToastAndroid.SHORT);
      } catch (e) {
          Alert.alert("Error al actualizar el test:", e);
      }
  };
  
  // Función para eliminar un test
  const deleteTest = async (db, id) => {
      ToastAndroid.show("deleteTest is executing", ToastAndroid.SHORT);
      try {
          ToastAndroid.show("deleteTest pre runAsync", ToastAndroid.SHORT);
          ToastAndroid.show("datos de la funcion:", ToastAndroid.SHORT);
          ToastAndroid.show(id.toString(), ToastAndroid.SHORT);
          await db.runAsync(
              `DELETE FROM Test WHERE id = ?`,
              [id]
          );
          ToastAndroid.show("deleteTest post runAsync", ToastAndroid.SHORT);
          ToastAndroid.show("Test eliminado", ToastAndroid.LONG);
          getAllTests(db);
          ToastAndroid.show("post getAllTests", ToastAndroid.SHORT);
      } catch (e) {
          Alert.alert("Error al eliminar el test:", e);
      }
  };
  
  // Función para eliminar todos los tests
  const deleteAllTests = async (db) => {
    try {
      await db.runAsync(`DELETE FROM Test`);
      console.log("Todos los tests eliminados");
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
    tests,
  };
};

export default TestFunctions;
