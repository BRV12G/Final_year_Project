import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "C:/Users/Admin/Documents/final year project/nextjsproject/my-health-app/components/Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <Head>
          <title>FitLife-AI</title>
          <meta name="description" content="Stay on track with FitLife-AI" />
        </Head>
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-white">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Stay on Track with <br />
            <span className="text-blue-600">FitLife-AI</span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            Where Fitness meets Artificial Intelligence
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-48 py-3 bg-blue-500 text-white font-bold rounded shadow-lg hover:bg-blue-600">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-48 py-3 bg-gray-300 font-bold rounded shadow-lg hover:bg-gray-400">
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-blue-100">
          <Image
            src="/logo.png" // Replace with the actual image path
            alt="FitLife AI Logo"
            width={200}
            height={200}
          />
          <h2 className="text-3xl font-bold mt-6 text-blue-800">FitLife AI</h2>
          <p className="text-lg font-medium text-blue-700">
            PERSONALIZED HEALTHCARE ENGINE
          </p>
        </div>
      </div>
    </div>
  );
}
