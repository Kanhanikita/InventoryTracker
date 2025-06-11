import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Firebase config (keep sensitive values in .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // include other Firebase config fields if needed
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const querySnapshot = await getDocs(collection(db, "items"));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    }

    fetchItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, { quantity: newQuantity });

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const deleteItem = async (id) => {
    const itemRef = doc(db, "items", id);
    await deleteDoc(itemRef);

    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Inventory Page</h1>
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        Current Ingredient Inventory
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-yellow-50 p-4 rounded-xl shadow-md relative"
          >
            <h3 className="text-xl font-semibold text-purple-900">{item.name}</h3>
            <p
              className={`text-md font-medium mt-2 ${
                item.quantity >= 50
                  ? "text-green-600"
                  : item.quantity >= 20
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
            >
              Stock: {item.quantity} {item.unit}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                className="border border-yellow-500 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
                Qty
              </span>
              <button
                className="border border-yellow-500 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
                onClick={() =>
                  item.quantity > 0 &&
                  updateQuantity(item.id, item.quantity - 1)
                }
              >
                −
              </button>
            </div>

            <button
              className="absolute bottom-2 right-3 text-red-500 hover:text-red-700"
              onClick={() => deleteItem(item.id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
