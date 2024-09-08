import { View, ActivityIndicator, Alert } from 'react-native'
import { createContext, useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './Firebase'

export const FBContext = createContext()

export const FirebaseContext = ({children}) => {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        cargarFirebase()
    },[])

    async function cargarFirebase() {
        try {
            const categoriasSnapshot = await getDocs(collection(db, "categorias"));
            const categories = categoriasSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            let newCategories = []
            categories.map((categoria) => {
                newCategories.push({label:categoria.categoria, value:categoria.categoria})
            })
            setCategorias(newCategories)
        } catch (error) {
            console.log(error)
        }
    }


      return (
        <FBContext.Provider value={{categorias}}>
          {children}
        </FBContext.Provider>
    )

}
