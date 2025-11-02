"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "@/firebase";

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-8 text-center rounded-2xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded text-purple-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded text-purple-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-3 border rounded text-purple-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleCreateAccount}
          disabled={loading}
          className="w-full bg-purple-700 text-white font-bold py-2 rounded hover:bg-purple-800 hover:cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

<button
  onClick={async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/inventory"); // go to inventory after success
    } catch (err: any) {
      setError(err.message);
    }
  }}
  className="w-full mt-4 px-4 py-3 border border-purple-300 rounded-xl font-semibold text-purple-800 hover:bg-purple-50 hover:cursor-pointer transition"
>
  Continue with Google
</button>
        <p className="text-purple-700 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:cursor-pointer">
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
