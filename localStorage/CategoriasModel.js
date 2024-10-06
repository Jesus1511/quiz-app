import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoriasModel = () => {
  const [categorias, setCategorias] = useState([]);

  // Guardar por primera vez las categorias
  useEffect(() => {
    async function crearCategoria() {
      try {
        //const storedCategorias = await AsyncStorage.getItem('categorias');
        
        //if (!storedCategorias) {
          const newCategorias = [{value:"Matematicas", thereshold:0}, {value:"Leyes", thereshold:0}, {value:"Computación", thereshold:0}, {value:"Biologia", thereshold:0}, {value:"Castellano", thereshold:0}];
          await AsyncStorage.setItem('categorias', JSON.stringify(newCategorias));

          setCategorias(newCategorias);


        //} else {
        //  setCategorias(JSON.parse(storedCategorias));
        //}
        
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'info', 
          text1: "Hubo un problema al cargar las categorías",
          position: 'bottom',
          visibilityTime: 1000, 
        });
      }
    }
    crearCategoria();
  }, []);

  async function addCategory(categoria) {
    try {
      const storedCategorias = JSON.parse(await AsyncStorage.getItem('categorias'));
      const newCategorias = [...storedCategorias, categoria];
      setCategorias(newCategorias);
      await AsyncStorage.setItem('categorias', JSON.stringify(newCategorias));
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: 'info', 
        text1: "No se pudo añadir la categoría",
        position: 'bottom',
        visibilityTime: 1000, 
      });
    }
  }

  async function deleteCategory(category) {
    try {
      const storedCategorias = JSON.parse(await AsyncStorage.getItem('categorias'));
  
      if (Array.isArray(storedCategorias)) {
        const newCategorias = [...storedCategorias];
        
        newCategorias.splice(category, 1);
  
        setCategorias(newCategorias);
        await AsyncStorage.setItem('categorias', JSON.stringify(newCategorias));
        
        Toast.show({
          type: 'info', 
          text1: "Categoría eliminada con éxito",
          position: 'bottom',
          visibilityTime: 1000, 
        });
      } else {
        Toast.show({
          type: 'info', 
          text1: "No se encontraron categorías para eliminar",
          position: 'bottom',
          visibilityTime: 1000, 
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'info', 
        text1: "Hubo un problema al eliminar la categoría",
        position: 'bottom',
        visibilityTime: 1000, 
      });
    }
  }
  

  return { categorias, addCategory, deleteCategory };
};

export default CategoriasModel;
