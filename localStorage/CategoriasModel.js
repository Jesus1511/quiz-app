import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native'; // Asegúrate de importar esto si estás usando ToastAndroid y Alert

const CategoriasModel = () => {
  const [categorias, setCategorias] = useState([]);

  // Guardar por primera vez las categorias
  useEffect(() => {
    async function crearCategoria() {
      try {
        const storedCategorias = await AsyncStorage.getItem('categorias');
        
        if (!storedCategorias) {
          const newCategorias = [{value:"Matematicas", thereshold:0}, {value:"Leyes", thereshold:0}, {value:"Computación", thereshold:0}, {value:"Biologia", thereshold:0}, {value:"Castellano", thereshold:0}];
          await AsyncStorage.setItem('categorias', JSON.stringify(newCategorias));
          setCategorias(newCategorias);
        } else {
          setCategorias(JSON.parse(storedCategorias));
        }
        
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Hubo un problema al cargar las categorías', ToastAndroid.LONG);
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
      ToastAndroid.show('No se pudo añadir la categoría', ToastAndroid.LONG);
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
        
        ToastAndroid.show('Categoría eliminada con éxito', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('No se encontraron categorías para eliminar', ToastAndroid.LONG);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Hubo un problema al eliminar la categoría', ToastAndroid.LONG);
    }
  }
  

  return { categorias, addCategory, deleteCategory };
};

export default CategoriasModel;
