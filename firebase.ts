// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAiZI6tZ2uyO8KCMYtKVHtOb7QztVb4AYI",
    authDomain: "blubook-fdaf3.firebaseapp.com",
    databaseURL: "https://blubook-fdaf3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blubook-fdaf3",
    storageBucket: "blubook-fdaf3.firebasestorage.app",
    messagingSenderId: "962584040932",
    appId: "1:962584040932:web:538f8212e9722db50fa3f1"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);