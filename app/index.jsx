import App from '../App'
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import loadFonts from '../utils/font'

const index = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

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
         <App />
       )
     }
   }



export default index