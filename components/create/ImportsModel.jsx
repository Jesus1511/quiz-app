import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import CSVTemplate from '../../CSVTemplate';
import { shareAsync } from 'expo-sharing';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ToastAndroid, Alert, Platform } from 'react-native';

const ImportsModel = () => {
  const [data, setData] = useState()
  const csvString = CSVTemplate().trim();

useEffect(() => {
  const readCsvString = () => {
    
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const formattedData = results.data.map((item) => {
          const opciones = results.data
            .map((opt, index) => {
              if (index > 1 && index < 7) {
                return {
                  opcion: opt.opcion,
                  verdadera: opt.verdadera,
                };
              }
            })
            .filter(Boolean); 

          return {
            index: item.index,
            pregunta: item.pregunta,
            opciones,
          };
        });
        
        setData(formattedData);
      },
    });
  };

  readCsvString();
}, []);



  function handleImportCSV() {
    console.log(data)
  }

  function handleImportEcxel () {
      alert("wtf")
  }


  const handleDownload = async (s) => {
    let filename = "plantilla.csv";
    if (s == "ECXEL") {
      filename = "plantilla.xlsx";
    }

    const storage = getStorage();
    const storageRef = ref(storage, 'gs://quiz-app-5d414.appspot.com/template.csv');

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

    const contentType = result.headers["content-type"] || "text/csv";
    console.log(contentType)
    save(result.uri, filename, contentType);
  };


  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
        ToastAndroid.show("Se ah descargado correctamente la plantilla en el dispositivo", ToastAndroid.SHORT);
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };


  return {
    handleDownload,
    handleImportCSV,
    handleImportEcxel
  }
}

export default ImportsModel