"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setError(null);

    if (!email.trim()) return setError("Please enter an email.");
    if (!password) return setError("Please enter a password.");
    if (password !== confirmPassword) return setError("Passwords do not match!");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Success → back to login
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/inventory");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
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
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded text-purple-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-3 border rounded text-purple-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
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
          onClick={handleGoogle}
          disabled={loading}
          className="w-full mt-4 px-4 py-3 border border-purple-300 rounded-xl font-semibold text-purple-800 hover:bg-purple-50 hover:cursor-pointer transition disabled:opacity-50"
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
