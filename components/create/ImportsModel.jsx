import React, { useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import CSVFile from '../../assets/CSV_plantilla.csv'

const ImportsModel = () => {
  const fileUriCSVTemplate = FileSystem.documentDirectory + 'CSV_plantilla.csv';

  useEffect(() => {
    const copyCSVTemplate = async () => {
      try {
        // Verifica si el archivo ya existe
        const fileInfo = await FileSystem.getInfoAsync(fileUriCSVTemplate);
        
        if (!fileInfo.exists) {
          const csvTemplateAsset = Asset.fromModule(CSVFile).uri;
          await FileSystem.copyAsync({
            from: csvTemplateAsset,
            to: fileUriCSVTemplate,
          });
          console.log('CSV copiado a:', fileUriCSVTemplate);
        }
      } catch (error) {
        console.error('Error al copiar el CSV:', error);
      }
    };

    copyCSVTemplate();
  }, []);

  const processCSV = (csvData) => {
    const preguntas = csvData.map((row) => {
      const opciones = [];

      for (let i = 2; i <= 6; i++) {
        const opcionKey = `opcion_${i - 1}`;
        const verdaderaKey = `verdadera_${i - 1}`;

        if (row[opcionKey]) {
          opciones.push({
            isTrue: row[verdaderaKey] === 'true',
            opcion: row[opcionKey],
          });
        }
      }

      if (opciones.length >= 2 && opciones.length <= 5) {
        return {
          index: parseInt(row.index),
          pregunta: row.pregunta,
          opciones,
        };
      } else {
        console.error(`La pregunta con índice ${row.index} no tiene entre 2 y 5 opciones válidas.`);
        return null;
      }
    });

    return preguntas.filter((pregunta) => pregunta !== null);
  };

  async function handleUploadCSV(fileUri) {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      console.log("Contenido del archivo:", fileContent);

      Papa.parse(fileContent, {
        header: true,
        complete: (result) => {
          console.log(result.data);
          const preguntas = processCSV(result.data);
          console.log("preguntas", preguntas);
        },
      });
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  }

  function handleImportCSV() {
    handleUploadCSV(fileUriCSVTemplate);
  }
    function handleImportEcxel () {
        alert("wtf")
    }
    
    function handleDowload (format) {
        alert(format)
    }

  return {
    handleDowload,
    handleImportCSV,
    handleImportEcxel
  }
}

export default ImportsModel