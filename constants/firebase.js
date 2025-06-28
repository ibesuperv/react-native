// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAfWx9zruQjdbKOgQ472qU46zLte7mS7RI",
    authDomain: "esp-project-b6c1f.firebaseapp.com",
    databaseURL: "https://esp-project-b6c1f-default-rtdb.firebaseio.com",
    projectId: "esp-project-b6c1f",
    storageBucket: "esp-project-b6c1f.firebasestorage.app",
    messagingSenderId: "468398429081",
    appId: "1:468398429081:web:82aa4e8d382d7e83a67908",
    measurementId: "G-FD2NR8ELDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);