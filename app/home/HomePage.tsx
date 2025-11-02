"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-50 text-center">
      <Image src="/ice-cream-icon.png" alt="Logo" width={100} height={100} />
      <h1 className="text-4xl font-bold text-purple-800 mt-4">
        Welcome to TrackNova Intelligence!
      </h1>
      <p className="text-purple-700 mt-2 max-w-md">
        Keep track of all your ingredients with ease!
      </p>

      <button
        onClick={goToLogin}
        className="mt-6 px-6 py-3 bg-yellow-400 hover:cursor-pointer text-purple-800 font-semibold rounded-xl shadow hover:shadow-md transition"
      >
        Enter Inventory →
      </button>
    </div>
  );
}
