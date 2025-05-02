import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import Image from "next/image";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("units");
  const [items, setItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "ingredients"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!ingredient) return;
    await addDoc(collection(db, "ingredients"), {
      name: ingredient,
      quantity: Number(quantity),
      unit,
    });
    setIngredient("");
    setQuantity(0);
    setUnit("units");
  };

  const updateQuantity = async (id, newQuantity) => {
    const itemRef = doc(db, "ingredients", id);
    await updateDoc(itemRef, {
      quantity: newQuantity,
    });
  };

  const confirmDelete = (item) => {
    setIngredientToDelete(item);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!ingredientToDelete) return;
    const itemRef = doc(db, "ingredients", ingredientToDelete.id);
    await deleteDoc(itemRef);
    setShowConfirm(false);
    setIngredientToDelete(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
          <div className="flex items-center justify-center gap-4 mb-6">
  <Image
    src="/logo.png"
    alt="Logo"
    width={60}
    height={60}
    className="rounded-full"
  />
  <h1 className="text-4xl text-purple-700 font-semibold mb-4">InventoryTracker</h1>

</div>
     

      <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl text-purple-700 font-semibold mb-4">
          Add New Ingredient
        </h2>
        <input
          className="w-full p-2 border rounded mb-4 bg-white text-purple-900"
          placeholder="e.g., Milk, Sugar, Vanilla Extract"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <div className="flex gap-4 mb-4 ">
          <input
            type="number"
            className="w-full p-2 border rounded mb-4 bg-white text-purple-900"
            placeholder="Quantity in Stock"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
  <select
  className="p-2 rounded border  bg-white text-purple-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition"
  value={unit}
  onChange={(e) => setUnit(e.target.value)}
>
  <option value="units">units</option>
  <option value="liters">liters</option>
  <option value="grams">grams</option>
  <option value="kg">kg</option>
  <option value="bottles">bottles</option>
</select>
        </div>
        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-purple-800 py-2 px-4 rounded hover:bg-yellow-500"
        >
          ➕ Add Ingredient
        </button>
      </div>
      <div className=" flex items-center justify-center h-15 bg-yellow-50 p-6 rounded-lg shadow-md mb-10">
      <h1 className="text-4xl text-purple-700 font-semibold mb-4">
        Current Ingredient Inventory
      </h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              {item.name}
            </h3>
            <p
              className={`text-lg font-medium mb-4 ${
                item.quantity > 30
                  ? "text-green-600"
                  : item.quantity > 10
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
            >
              Stock: {item.quantity} {item.unit}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="border border-yellow-500 px-3 py-1 rounded text-yellow-700"
              >
                +
              </button>
              <span className="px-3 py-1 border border-purple-200 rounded bg-white text-purple-700 font-medium">
                Qty
              </span>
              <button
                onClick={() =>
                  item.quantity > 0 &&
                  updateQuantity(item.id, item.quantity - 1)
                }
                className="border border-yellow-500 px-3 py-1 rounded text-yellow-700"
              >
                −
              </button>
            </div>
            <button
              onClick={() => confirmDelete(item)}
              className="text-red-600 text-sm self-end hover:underline"
              title="Delete Ingredient"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showConfirm && ingredientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Are you sure?
            </h3>
            <p className="text-gray-700 mb-6">
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-bold">{ingredientToDelete.name}</span>{" "}
              ingredient from your inventory.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}