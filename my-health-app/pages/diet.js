import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/dist/client/link';
import Navbar from '../components/Navbar';
const DietReport = () => {
  const [microsPage, setMicrosPage] = useState(1); // State to track the current card in MICROS

  const handleMicrosToggle = () => {
    setMicrosPage((prev) => (prev === 1 ? 2 : 1)); // Toggle between pages 1 and 2 for MICROS
  };

  return (
    <>
    <Navbar />
      <Head>
        <title>Your Diet Report</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-blue-100 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600">Your Diet Report:</h1>
        <p className="text-gray-600 text-center mt-2">
          Below are your personalized recommended daily intake of various nutrients.
        </p>

        {/* Report Cards */}
        <div className="flex justify-center mt-10 space-x-6">
          {/* MACROS Card */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64">
            <h2 className="text-xl font-bold text-blue-600">MACROS</h2>
            <ul className="text-gray-700 mt-4 space-y-2">
              <li>
                <strong>Carbohydrates:</strong> 375g
              </li>
              <li>
                <strong>Proteins:</strong> 137g
              </li>
              <li>
                <strong>Fats:</strong> 78g
              </li>
              <li>
                <strong>Recommended calorie intake:</strong> 2500 kcal
              </li>
            </ul>
          </div>

          {/* MICROS Card */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64 relative">
            <h2 className="text-xl font-bold text-blue-600">MICROS</h2>
            {microsPage === 1 ? (
              <ul className="text-gray-700 mt-4 space-y-2">
                <li>
                  <strong>Vit A:</strong> 700mcg
                </li>
                <li>
                  <strong>Vit C:</strong> 105mg
                </li>
                <li>
                  <strong>Vit D:</strong> 15mcg
                </li>
                <li>
                  <strong>Sodium:</strong> 1500mg
                </li>
              </ul>
            ) : (
              <ul className="text-gray-700 mt-4 space-y-2">
                <li>
                  <strong>Iron:</strong> 18mg
                </li>
                <li>
                  <strong>Magnesium:</strong> 360mg
                </li>
                <li>
                  <strong>Zinc:</strong> 8mg
                </li>
                <li>
                  <strong>Potassium:</strong> 2600mg
                </li>
              </ul>
            )}

            {/* Arrow Button */}
            <button
              onClick={handleMicrosToggle}
              className="absolute top-1/2 right-[-1rem] transform -translate-y-1/2 bg-blue-500 text-white w-8 h-8 rounded-full shadow hover:bg-blue-600 flex items-center justify-center"
            >
              →
            </button>
          </div>

          {/* OTHERS Card */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64">
            <h2 className="text-xl font-bold text-blue-600">OTHERS</h2>
            <ul className="text-gray-700 mt-4 space-y-2">
              <li>
                <strong>Fibre:</strong> 35g
              </li>
              <li>
                <strong>Recommended water intake:</strong> 3.74L
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Button */}
        <Link href="/food_options">
        <button className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          See Food Options
        </button></Link>
      </main>
    </>
  );
};

export default DietReport;
