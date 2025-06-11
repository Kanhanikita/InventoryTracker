// Add your Firebase config and initialization here
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCqW1Ml9OdQDjH2ACdEsc9twHZyip6UpNY",
  authDomain: "inventorytracker-91334.firebaseapp.com",
  projectId: "inventorytracker-91334",
  storageBucket: "inventorytracker-91334.firebasestorage.app",
  messagingSenderId: "53563973315",
  appId: "1:53563973315:web:4b140c59999885e2e58c76",
  measurementId: "G-JR8ZNSEH08"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
