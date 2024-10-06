import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

import { shareAsync } from 'expo-sharing';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Toast from 'react-native-toast-message';

const ImportsModel = () => {

// Función para procesar CSV
const handleImportCsv = async (fileContents) => {
  // Parsear CSV
  const parsedCsv = Papa.parse(fileContents, { header: true });
  const data = parsedCsv.data;

  // Procesar el contenido para generar el objeto de preguntas
  const preguntas = data
    .map((row) => {
      const { index, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, opcion_5, correcta } = row;

      console.log("correcta",correcta)
      // Crear las opciones filtrando las vacías
      const opciones = [
        { isTrue: correcta == "a", opcion: opcion_1 },
        { isTrue: correcta == "b", opcion: opcion_2 },
        { isTrue: correcta == "c", opcion: opcion_3 },
        { isTrue: correcta == "d", opcion: opcion_4 },
        { isTrue: correcta == "e", opcion: opcion_5 },
      ].filter((op) => op.opcion); // Filtrar las opciones que no son válidas

      // Verificar que la pregunta no esté vacía y que haya al menos una opción válida
      if (pregunta && opciones.length > 1) {
        return {
          index: parseInt(index),
          pregunta,
          opciones,
        };
      }

      // Retornar null si la pregunta o las opciones son inválidas
      return null;
    })
    .filter((pregunta) => pregunta !== null); // Filtrar las preguntas no válidas

  return preguntas;
};

// Función para procesar XLSX
const handleImportXlsx = async (fileUri) => {
  const binaryString = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
  });

  // Parsear XLSX
  const workbook = XLSX.read(binaryString, { type: 'base64' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }).slice(1); // Ignorar primera fila

  const preguntas = data
  .map((row, i) => {
    // Crear las opciones filtrando las vacías
    const opciones = [
      { isTrue: row[7] == "a", opcion: row[2] },
      { isTrue: row[7] == "b", opcion: row[3] },
      { isTrue: row[7] == "c", opcion: row[4] },
      { isTrue: row[7] == "d", opcion: row[5] },
      { isTrue: row[7] == "e", opcion: row[6] },
    ].filter((op) => op.opcion);

    // Verificar que la pregunta no esté vacía y que haya al menos una opción válida
    if (row[1] && opciones.length > 1) {
      return {
        index: row[0],
        pregunta: row[1],
        opciones,
      };
    }

    // Retornar null si la pregunta o las opciones son inválidas
    return null;
  })
  .filter((pregunta) => pregunta !== null); // Filtrar las preguntas no válidas
return preguntas;
};

// Función principal
const handleImportQuestions = async () => {
  try {
      // Permite al usuario seleccionar el archivo
      const result = await DocumentPicker.getDocumentAsync();

      if (result.type === 'cancel') {
          return;
      }

      const fileUri = result.assets[0]?.uri;
      const fileName = result.assets[0]?.name;

      // Leer archivo como texto
      const fileContents = await FileSystem.readAsStringAsync(fileUri);

      let preguntas;
      if (fileName.endsWith('.csv')) {
          preguntas = await handleImportCsv(fileContents);
      } else if (fileName.endsWith('.xlsx')) {
          preguntas = await handleImportXlsx(fileUri);
      }

      if (preguntas.length < 5) {
        Toast.show({
          type: 'info', 
          text1: "Añade un minimo de 5 preguntas",
          position: 'bottom',
          visibilityTime: 1000, 
        });
        return []
      }
      return preguntas

      // Aquí puedes continuar con lo que deseas hacer con 'preguntas'

  } catch (error) {
      console.error('Error al importar preguntas:', error);
  }
};


  const handleDownload = async (s, setIsDownloading) => {
    setIsDownloading(true);

    let filename = "plantilla.csv";
    let link = "gs://quiz-app-5d414.appspot.com/plantilla.csv";

    if (s == "ECXEL") {
      filename = "plantilla.xlsx";
      link = "gs://quiz-app-5d414.appspot.com/plantilla.xlsx"
    }

    const storage = getStorage();
    const storageRef = ref(storage, link);

    const downloadURL = await getDownloadURL(storageRef);

    const result = await FileSystem.downloadAsync(
      downloadURL,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );

    shareAsync(result.uri);
    
    setIsDownloading(false);
  };

  return {
    handleDownload,
    handleImportQuestions,
  }
}

export default ImportsModel