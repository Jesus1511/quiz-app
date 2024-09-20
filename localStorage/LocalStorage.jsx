import React, { createContext, useState, useEffect } from 'react';
import TestFunctions from './TestFunctions';
import { View, ActivityIndicator } from 'react-native';
import CategoriasModel from './CategoriasModel';
import { useSQLiteContext, SQLiteProvider } from 'expo-sqlite';
import { exams } from '../utils/Consts';

const AppContext = createContext();

const LocalStorage = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [intento, setIntento] = useState([]);

  const { categorias, addCategory, deleteCategory } = CategoriasModel();
  const { createTest, updateTest, getAllTests, deleteTest, deleteAllTests, updateTrys, tests } = TestFunctions();

  const db = useSQLiteContext(); // Obtén la instancia de la base de datos

  useEffect(() => {
    async function fetchData() {
      try {
        await getAllTests(db); 
        //await createTest(db, exams[1])
      } catch (e) {
        console.log("Error:", e);
      }
    }

    if (db) {
      fetchData();
    }
  }, [db]); // Dependencia en `db` para ejecutar cuando el contexto esté disponible

  if (!categorias || !tests) {
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,

        tests,
        getAllTests,
        deleteTest,
        updateTest,
        createTest,
        updateTrys,

        categorias,
        addCategory,
        deleteCategory,

        intento,
        setIntento
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const App = ({children}) => {
  
  const {initializeDatabase} = TestFunctions()

  return (
  <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
    <LocalStorage>
      {children}
    </LocalStorage>
  </SQLiteProvider>
)};

export default App;
export { AppContext };
