import App from '../App'
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import loadFonts from '../utils/font'
import { initializeApp } from "firebase/app";
import Toast from 'react-native-toast-message';

const index = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCoSebBw6U9HlHlTu9g6A6gWdoq4-KT5HU",
    authDomain: "quiz-app-5d414.firebaseapp.com",
    projectId: "quiz-app-5d414",
    storageBucket: "quiz-app-5d414.appspot.com",
    messagingSenderId: "82942388183",
    appId: "1:82942388183:web:0a32625b15d9385c6f8d92",
    measurementId: "G-0XMD0WM21G"
  };

  const app = initializeApp(firebaseConfig);


  useEffect(() => {
    const loadApp = async () => {
        await loadFonts();
        setFontsLoaded(true);
    };
    loadApp();
  }, []);
  
 if ( !fontsLoaded ) {
   return (
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       <ActivityIndicator />
     </View>
   )} else {
     return (
      <>
         <App />
         <Toast />
      </>
       )
     }
   }



export default index