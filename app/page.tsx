"use client";
import { useState } from "react";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function HomePage() {
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

  return (
    <div className="min-h-screen bg-purple-50 text-center relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/ice-cream-icon.png" alt="InventoryTracker Logo" width={100} height={100} />
        <h1 className="text-4xl font-bold text-purple-800 mt-4">Welcome to TrackNova Intelligence!</h1>
        <p className="text-purple-700 mt-2 max-w-md">
          Keep track of all your ingredients with ease — efficient, colorful, and simple!
        </p>
        <a
          href="#inventory"
          className="mt-6 px-6 py-3 bg-yellow-400 text-purple-800 font-semibold rounded-xl shadow hover:shadow-md transition"
        >
          Enter Inventory →
        </a>
      </div>
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged-in, redirect home
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/");
    });
    return () => unsub();
  }, [router]);

  const loginWithGoogle = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/");
    } catch (e: any) {
      setError(e?.message ?? "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const loginWithEmail = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch (e: any) {
      setError(e?.message ?? "Email sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const registerWithEmail = async () => {
    setError(null);
    setBusy(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch (e: any) {
      setError(e?.message ?? "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Login</h1>
        <p className="text-purple-700 mb-6">
          Sign in to access TrackNova Intelligence.
        </p>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            onClick={loginWithEmail}
            disabled={busy}
            className="w-full mt-2 px-4 py-3 font-semibold rounded-xl bg-yellow-400 text-purple-900 hover:shadow disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>

          <button
            onClick={registerWithEmail}
            disabled={busy}
            className="w-full px-4 py-3 font-semibold rounded-xl bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-60"
          >
            {busy ? "Creating account..." : "Create account"}
          </button>

          <div className="relative py-2 text-center text-sm text-purple-600">
            <span className="px-3 bg-white relative z-10">or</span>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-purple-200 -z-0" />
          </div>

          <button
            onClick={loginWithGoogle}
            disabled={busy}
            className="w-full px-4 py-3 font-semibold rounded-xl border border-purple-200 hover:bg-purple-50 disabled:opacity-60"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
      <div id="inventory" className="bg-yellow-100 px-6 py-10 flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-4">
          <Image src="/ice-cream-icon.png" alt="Icon" width={50} height={50} />
          <h2 className="text-3xl font-bold text-purple-700">TrackNova Intelligence</h2>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow max-w-xl w-full">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Add New Ingredient</h3>
          <input
            type="text"
            placeholder="e.g., Milk, Sugar, Vanilla Extract"
            className="w-full m-1 p-3 text-purple-800 border rounded"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Quantity in Stock"
              className="w-full m-1 p-3 text-purple-800 border rounded"
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
            className={`mt-4 px-4 py-2 font-bold rounded shadow hover:shadow-md transition ${addClicked ? 'bg-yellow-100 text-green-900' : 'bg-yellow-400 text-purple-800'}`}
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 py-10 px-6">
        <h3 className="text-3xl font-bold text-purple-700 mb-6">Current Ingredient Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ingredients.map((item, index) => (
         <div key={index} className="bg-yellow-50 p-6 rounded-xl shadow text-left">
  <h4 className="text-xl font-bold text-purple-800">{item.name}</h4>

  <p className={`mb-3 ${item.quantity <= 5 ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
    Stock: {item.quantity} {item.unit}
  </p>

  {item.quantity <= 5 && (
    <p className="text-red-500 text-sm mb-2">⚠️ Low stock! Consider restocking soon.</p>
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
                className={`mt-4 block hover:underline rounded px-2 py-1 font-semibold ${deleteClicked === index ? 'bg-red-200 text-red-700' : 'text-red-500'}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm animate-pop-in">
            <h4 className="text-xl font-bold text-red-600 mb-4">Delete Ingredient?</h4>
            <p className="mb-6 text-purple-800">
              Are you sure you want to delete
              <span className="font-semibold"> {ingredients[confirmDeleteIndex].name}</span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmDeleteIndex(null);
                  setDeleteClicked(null);
                }}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-300"
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
