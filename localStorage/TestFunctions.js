import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Alert } from 'react-native';
import * as Crypto from 'expo-crypto';
import Toast from 'react-native-toast-message';

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
      const db = await SQLite.openDatabaseAsync('databases.db');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Test (
          id TEXT,
          tiempo INTEGER,
          name TEXT,
          categoria TEXT,
          preguntas TEXT,
          intentos TEXT,
          fails TEXT
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
        `INSERT INTO Test (id, tiempo, name, categoria, preguntas, intentos, fails) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          newId,
          testData.tiempo,
          testData.name,
          testData.categoria,
          JSON.stringify(testData.preguntas),
          JSON.stringify(testData.intentos),
          JSON.stringify(testData.fails)
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
        fails: row.fails ? JSON.parse(row.fails) : [],
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
        Toast.show({
          type: 'info', 
          text1: "Test no encontrado",
          position: 'bottom',
          visibilityTime: 1000, 
        });
        return;
      }
  
      await db.runAsync(
        `UPDATE Test SET tiempo = ?, name = ?, categoria = ?, preguntas = ?, intentos = ?, fails = ? WHERE id = ?`,
        [
          updatedData.tiempo,
          updatedData.name,
          updatedData.categoria,
          JSON.stringify(updatedData.preguntas),
          JSON.stringify(updatedData.intentos),
          JSON.stringify(updatedData.fails),
          id
        ]
      );
  
      Toast.show({
        type: 'info', 
        text1: "Test actualizado",
        position: 'bottom',
        visibilityTime: 1000, 
      });
      await getAllTests(db);
    } catch (e) {
      Alert.alert("Error al actualizar el test:", e.message);
    }
  };
  
  const updateTrys = async (db, id, updatedData, fails) => {
    try {
      console.log("Generando ID:", id.toString());
  
      // Obtener las columnas 'intentos' y 'fails' de la base de datos
      const test = await db.getFirstAsync(
        `SELECT intentos, fails FROM Test WHERE id = ?`,
        [id]
      );
  
      if (!test) {
        Toast.show({
          type: 'info', 
          text1: "Test no encontrado",
          position: 'bottom',
          visibilityTime: 1000, 
        });
        return;
      }
  
      // Parsear los datos de 'intentos' y 'fails'
      const oldIntentos = JSON.parse(test.intentos || "[]");
      const oldFails = JSON.parse(test.fails || "[]");
  
      // Agregar el nuevo intento y mantener solo los últimos 3
      const newIntentos = [...oldIntentos, updatedData].slice(-3);
  
      // Actualizar los fallos: Reemplazar si ya existe, añadir si no
      const updatedFails = oldFails.map(fail => {
        // Verificar si el `index` del fail ya existe en `fails`
        const matchingFail = fails.find(f => f.index === fail.index);
        
        // Si existe un fail con el mismo `index`, reemplazarlo
        return matchingFail ? matchingFail : fail;
      });
  
      // Añadir los nuevos fallos que no estaban previamente
      fails.forEach(fail => {
        if (!updatedFails.some(f => f.index === fail.index)) {
          updatedFails.push(fail);
        }
      });
  
      // Actualizar la tabla 'Test' con los nuevos valores
      await db.runAsync(
        `UPDATE Test SET intentos = ?, fails = ? WHERE id = ?`, 
        [
          JSON.stringify(newIntentos),
          JSON.stringify(updatedFails),
          id
        ]
      );
  
      // Obtener todos los tests
      await getAllTests(db);
    } catch (e) {
      Alert.alert("Error al actualizar el test:", e.message);
    }
  };
  



  const deleteTest = async (db, id) => {
    try {
      console.log("Generando ID:", id.toString());
      const checkId = await db.getFirstAsync(
        `SELECT id FROM Test WHERE id = ?`,
        [id]
      );
  
      if (!checkId) {
        Toast.show({
          type: 'info', 
          text1: "Test no encontrado",
          position: 'bottom',
          visibilityTime: 1000, 
        });
        return;
      }
  
      await db.runAsync(
        `DELETE FROM Test WHERE id = ?`,
        [id]
      );
  
      Toast.show({
        type: 'info', 
        text1: "Test eliminado",
        position: 'bottom',
        visibilityTime: 1000, 
      });
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