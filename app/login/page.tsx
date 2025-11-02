// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth, googleProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/inventory"); // after login
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/inventory");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header with clickable brand */}
      <div className="bg-purple-50">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href="/"
            aria-label="Go to Home"
            className="flex items-center gap-3 hover:opacity-90 hover:cursor-pointer transition"
          >
            <Image src="/ice-cream-icon.png" alt="TrackNova" width={50} height={50} />
            <span className="text-2xl sm:text-3xl font-bold text-purple-700">
              TrackNova Inventory
            </span>
          </Link>
        </div>
      </div>

      {/* Auth card */}
      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center bg-purple-50 px-4">
        <div className="bg-white p-8 rounded-2xl text-center shadow w-full max-w-md">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Login</h1>

          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded text-purple-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-3 border rounded text-purple-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 text-purple-800 font-bold py-2 rounded hover:bg-yellow-500 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full mt-4 px-4 py-3 border border-purple-300 rounded-xl font-semibold text-purple-800 hover:bg-purple-50 hover:cursor-pointer transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>

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
