"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "@/firebase";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/inventory"); // after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (

    <>
        <div className="flex items-center   bg-purple-50 space-x-3">
          
          <Link href="/"  aria-label="Go to Home" className="flex items-center gap-3  bg-purple-50 shrink-0 hover:opacity-90 hover:cursor-pointer transition">
    <Image src="/ice-cream-icon.png" alt="TrackNova" width={50} height={50} />
    <span className="text-3xl font-bold text-purple-700">TrackNova Inventory</span>
  </Link> 
  </div>

    <div className="min-h-screen flex items-center  justify-center bg-purple-50">
      <div className="bg-white p-8 rounded-2xl text-center shadow w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border text-purple-800 rounded"
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
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-purple-800 font-bold py-2 rounded hover:bg-yellow-500 hover:cursor-pointer"
        >
          Login
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
        {/* 👇 New link to Create Account page */}
        <p className="text-purple-700 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/create-account" className="underline hover:cursor-pointer">
            Create one here
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
