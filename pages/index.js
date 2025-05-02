import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-purple-900 text-center p-8">
      <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to InventoryTracker</h1>
      <p className="text-lg mb-8 max-w-xl">
        Keep track of all your ice cream ingredients with ease — efficient, colorful, and simple!
      </p>
      <Link href="/home">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 px-6 py-3 rounded-xl shadow-lg text-lg transition">
          Enter Inventory →
        </button>
        
      </Link>
    </div>
  );
}
