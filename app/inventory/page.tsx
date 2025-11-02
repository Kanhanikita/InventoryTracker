"use client";
import { useState } from "react";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InventoryPage() {
  const router = useRouter();

  const [ingredients, setIngredients] = useState([
    { name: "Milk", quantity: 89, unit: "kg" },
    { name: "Sugar", quantity: 50, unit: "kg" },
  ]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [unit, setUnit] = useState("units");
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  const [deleteClicked, setDeleteClicked] = useState<number | null>(null);
  const [addClicked, setAddClicked] = useState(false);

   const addIngredient = async () => {
    if (!newIngredient || !newQuantity) return;
    const trimmedName = newIngredient.trim();
    const quantityNum = Number(newQuantity);
    if (!trimmedName || isNaN(quantityNum)) return;

    try {
      await addDoc(collection(db, "ingredients"), {
        name: trimmedName,
        quantity: quantityNum,
        unit,
      });
      setIngredients((prev) => [
        ...prev,
        { name: trimmedName, quantity: quantityNum, unit },
      ]);
      setNewIngredient("");
      setNewQuantity("");
      setUnit("units");
      setAddClicked(true);
      setTimeout(() => setAddClicked(false), 300);
    } catch (error) {
      console.error("Failed to add ingredient:", error);
      alert("Failed to add ingredient. Please try again.");
    }
  };

   const updateQuantity = (index: number, delta: number) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index].quantity = Math.max(0, updated[index].quantity + delta);
      return updated;
    });
  };

   const actuallyDeleteIngredient = (index: number) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

   const handleSignOut = async () => {
    await signOut(auth);
    router.push("/"); // go back home after sign out
  };

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          
          <Link
    href="/"
    aria-label="Go to Home"
    className="flex items-center gap-3 shrink-0 hover:opacity-90 hover:cursor-pointer transition"
  >
    <Image src="/ice-cream-icon.png" alt="TrackNova" width={50} height={50} />
    <span className="text-3xl font-bold text-purple-700">TrackNova Inventory</span>
  </Link> 
   </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Add new ingredient */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">Add New Ingredient</h3>
        <input
          type="text"
          placeholder="e.g., Milk, Sugar, Vanilla Extract"
          className="w-full mb-2 p-3 text-purple-800 border rounded"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Quantity in Stock"
            className="w-full p-3 text-purple-800 border rounded"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <select
            className="p-3 border rounded text-purple-700"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="liters">liters</option>
            <option value="units">units</option>
          </select>
        </div>
        <button
          className={`mt-4 w-full px-4 py-2 font-bold rounded shadow hover:shadow-md transition ${
            addClicked ? "bg-yellow-100 text-green-900" : "bg-yellow-400 text-purple-800"
          }`}
          onClick={addIngredient}
        >
          Add Ingredient
        </button>
      </div>

      {/* Inventory list */}
      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {ingredients.map((item, index) => (
          <div key={index} className="bg-yellow-50 p-6 rounded-xl shadow text-left">
            <h4 className="text-xl font-bold text-purple-800">{item.name}</h4>

            <p
              className={`mb-3 ${
                item.quantity <= 5 ? "text-red-600 font-semibold" : "text-green-600"
              }`}
            >
              Stock: {item.quantity} {item.unit}
            </p>

            {item.quantity <= 5 && (
              <p className="text-red-500 text-sm mb-2">
                ⚠️ Low stock! Consider restocking soon.
              </p>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(index, 1)}
                className="px-3 py-1 border border-yellow-500 text-yellow-700 rounded"
              >
                +
              </button>
              <span className="px-3 py-1 border border-purple-400 rounded text-purple-700">
                Qty
              </span>
              <button
                onClick={() => updateQuantity(index, -1)}
                className="px-3 py-1 border border-yellow-500 text-yellow-700 rounded"
              >
                −
              </button>
            </div>

            <button
              onClick={() => {
                setDeleteClicked(index);
                setConfirmDeleteIndex(index);
              }}
              className={`mt-4 block hover:underline rounded px-2 py-1 font-semibold ${
                deleteClicked === index
                  ? "bg-red-200 text-red-700"
                  : "text-red-500"
              }`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h4 className="text-xl font-bold text-red-600 mb-4">Delete Ingredient?</h4>
            <p className="mb-6 text-purple-800">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {ingredients[confirmDeleteIndex].name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmDeleteIndex(null);
                  setDeleteClicked(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  actuallyDeleteIngredient(confirmDeleteIndex);
                  setConfirmDeleteIndex(null);
                  setDeleteClicked(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
