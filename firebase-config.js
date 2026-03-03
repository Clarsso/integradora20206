import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // Nuevo

const firebaseConfig = {
    apiKey: "AIzaSyBQNrXhhYylsDJpCtpmuLEVMFoOJqhGkoE",
    authDomain: "eventix-1b16b.firebaseapp.com",
    projectId: "eventix-1b16b",
    storageBucket: "eventix-1b16b.firebasestorage.app",
    messagingSenderId: "995919415052",
    appId: "1:995919415052:web:3dcbcd41595f76cfb7ab29",
    measurementId: "G-DQ765LZYZ2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Exportamos Auth