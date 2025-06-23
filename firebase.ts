import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqW1Ml9OdQDjH2ACdEsc9twHZyip6UpNY",
  authDomain: "inventorytracker-91334.firebaseapp.com",
  projectId: "inventorytracker-91334",
  storageBucket: "inventorytracker-91334.firebasestorage.app",
  messagingSenderId: "53563973315",
  appId: "1:53563973315:web:7158eade6385696ce58c76",
  measurementId: "G-K26HE3Y5JP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };

