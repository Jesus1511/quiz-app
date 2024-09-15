import React, { createContext, useState, useEffect } from 'react';
import TestFunctions from './TestFunctions';
import {View, ActivityIndicator} from 'react-native'

import CategoriasModel from './CategoriasModel';

const AppContext = createContext();

const LocalStorage = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [db, setDb] = useState(null);

  const { categorias, addCategory, deleteCategory } = CategoriasModel()
  const {initializeDatabase, createTest, updateTest, getAllTests, deleteTest, deleteAllTests, tests, generateRandomId} = TestFunctions()

  useEffect(() => {
    async function inicializar () {
      try {
        const dbs = await initializeDatabase()
        //createTest(dbs,{name:"s", categoria:"s", preguntas:[], intentos:[], tiempo:8})
        //deleteAllTests(db)
        getAllTests(dbs)
        setDb(dbs)
        
      } catch (e) {
        console.log("Error:", e)
      }

    }

    inicializar()
  }, []);

  if (!categorias || !tests || !db) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <AppContext.Provider value={{
      questions,
      setQuestions,

      tests,
      getAllTests,
      deleteTest,
      updateTest,
      createTest,
      db,

      categorias,
      addCategory,
      deleteCategory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default LocalStorage;
export { AppContext };
