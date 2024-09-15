import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, FlatList, Text } from 'react-native';
import { AppContext } from '../../localStorage/LocalStorage'; // Importar el contexto
import useColors from '../../utils/Colors';
import { useColorScheme, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Trash } from '../../assets/images/Trash';

const AddCategoryScreen = () => {
  const { categorias, addCategory, deleteCategory } = useContext(AppContext); // Obtener las categorías y la función del contexto
  const [newCategory, setNewCategory] = useState('');

  const isDark = useColorScheme() === 'dark';
  const Colors = useColors(isDark);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({value:newCategory, thereshold: 0});
      setNewCategory(''); // Limpiar el input después de agregar
    } else {
      ToastAndroid.show('El nombre de la categoría no puede estar vacío', ToastAndroid.LONG);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar esta categoría?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => deleteCategory(categoryId) }, // Eliminar la categoría al confirmar
        ],
        { cancelable: true }
      );
  };

  const renderCategory = ({ item, key }) => (
    <View key={key} style={styles.categoryItem}>
      <Text style={{ color: Colors.text }}>{item.value}</Text>
      <TouchableOpacity onPress={() => handleDeleteCategory(key)}>
        <Trash color={Colors.text} size={23}/>
      </TouchableOpacity>
    </View>
  );

  const styles = DynamicStyles(Colors);

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
        <View>
            <FlatList
                data={categorias}
                renderItem={renderCategory}
                keyExtractor={(item) => item.value}
                style={styles.categoryList}
              />


            <TextInput
                placeholderTextColor={Colors.label}
                placeholder="Nueva categoría"
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
              />

            <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
                <Text style={{color:Colors.text, fontSize:20, textAlign:"center", fontFamily:"Montserrat-SemiBold"}}>Añadir Categoria +</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default AddCategoryScreen;

const DynamicStyles = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.label,
    padding: 10,
    color: Colors.text,
    marginBottom: 20,
    marginTop: 50,
  },
  button: {
    backgroundColor:Colors.green,
    padding:15,
    borderRadius:10
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.label,
    flexDirection:"row",
    justifyContent:"space-between"
  },
});
