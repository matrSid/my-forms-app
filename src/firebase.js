// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByRWPQadoVJx3qY4ijeh2Eowhmj4OHL0k",
    authDomain: "formapp-fa5bf.firebaseapp.com",
    projectId: "formapp-fa5bf",
    storageBucket: "formapp-fa5bf.appspot.com",
    messagingSenderId: "388421635704",
    appId: "1:388421635704:web:80eb12af6a6cbdcac2678d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
