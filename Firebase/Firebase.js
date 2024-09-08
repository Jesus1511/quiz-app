import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChhEG7IdX48zqkczlde5WiEtQBAc6stNM",
    authDomain: "quiz-app-5d414.firebaseapp.com",
    projectId: "quiz-app-5d414",
    storageBucket: "quiz-app-5d414.appspot.com",
    messagingSenderId: "82942388183",
    appId: "1:82942388183:android:b1924ac27632fa6c6f8d92",
  };
  
  
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);