import Head from "next/head";
import Navbar from "@/components/Navbar";
import Link from "next/link";
//import "@/styles/globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Health App</title>
      </Head>
      <Navbar />
      <main className="p-6">
        <h1 className="text-4xl font-semibold">Welcome to Your Health App</h1>
        <p className="mt-4">
          This app tracks your health and provides recommendations.
        </p>
        <p>
          <Link href="/diet">
            <button>Diet recommendations</button>
          </Link>
        </p>
        <Link href="/fitness">
          <button>Fitness recommendations</button>
        </Link>
        <p>
          <Link href="/goaltracking">
            <button>Goal tracking</button>
          </Link>
        </p>
      </main>
    </div>
  );
}
