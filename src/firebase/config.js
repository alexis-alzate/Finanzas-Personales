import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB-fojpx-jtEJUxHGGRDhyS6uExYlopOqg",
    authDomain: "app-gastos-ventas.firebaseapp.com",
    projectId: "app-gastos-ventas",
    storageBucket: "app-gastos-ventas.firebasestorage.app",
    messagingSenderId: "912963561645",
    appId: "1:912963561645:web:72bb254221a5aef80d3e24",
    measurementId: "G-2BJ2Y5DPK9"
};
const app = initializeApp(firebaseConfig);

// Exporta los servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
