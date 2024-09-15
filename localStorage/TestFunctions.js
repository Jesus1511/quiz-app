import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';

const TestFunctions = () => {
  const [tests, setTests] = useState();

  function generateRandomId() {
    const digits = 50;
    
    const randomNumber = BigInt('1' + '0'.repeat(digits - 1)) * BigInt(Math.floor(Math.random() * 10));
  
    return randomNumber;
  }

  // Función para inicializar la base de datos y la tabla
  const initializeDatabase = async () => {
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
    return db
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
      getAllTests(db)
  
      console.log("Test creado");
    } catch (e) {
      console.log("Error:", e);
    }
  };

  // Función para leer todos los tests
  const getAllTests = async (db) => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM Test');
      const updatedRows = rows.map(row => ({
        ...row,
        // Asegúrate de que los campos se parseen solo si no son nulos
        preguntas: row.preguntas ? JSON.parse(row.preguntas) : [],
        intentos: row.intentos ? JSON.parse(row.intentos) : [],
      }));
      setTests(updatedRows);
      console.log("Tests obtenidos", updatedRows);
    } catch (e) {
      console.log("Error:", e);
    }
  };
  

  // Función para actualizar un test
  const updateTest = async (db, id, updatedData) => {
    await db.runAsync(
      `UPDATE Test SET tiempo = ?, name = ?, categoria = ?, preguntas = ?, intentos = ? WHERE id = ?`,
      updatedData.tiempo,
      updatedData.name,
      updatedData.categoria,
      JSON.stringify(updatedData.preguntas),
      JSON.stringify(updatedData.intentos),
      id
    );
    ToastAndroid.show("Test actualizado", ToastAndroid.LONG);
    getAllTests(db)
  };

  // Función para eliminar un test
  const deleteTest = async (db, id) => {
    await db.runAsync(
      `DELETE FROM Test WHERE id = ?`,
      id
    );
    ToastAndroid.show("Test eliminado", ToastAndroid.LONG)
    getAllTests(db)
  };

    // Función para eliminar todos los tests
    const deleteAllTests = async (db) => {
      await db.runAsync(`DELETE FROM Test`);
      console.log("Todos los tests eliminados");
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
