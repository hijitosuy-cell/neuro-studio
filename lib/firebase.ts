import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Proyecto Firebase `agencia-ea717`.
 * Esta config viaja al cliente en cualquier app web de Firebase: es pública por
 * diseño y la seguridad real la dan las reglas de Firestore.
 */
const firebaseConfig = {
  apiKey: "AIzaSyC--qLVFBvN6ixx3Iu4wAH1vtNQhpx5_E0",
  authDomain: "agencia-ea717.firebaseapp.com",
  projectId: "agencia-ea717",
  storageBucket: "agencia-ea717.firebasestorage.app",
  messagingSenderId: "1057434551152",
  appId: "1:1057434551152:web:e39908cfd5272a747970d4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
