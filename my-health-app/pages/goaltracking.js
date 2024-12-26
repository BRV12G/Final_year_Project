import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

const TrackGoals = () => {
  const [waterIntake, setWaterIntake] = useState(0); // State for water intake (in cups)

  const handleAddWater = () => {
    setWaterIntake(waterIntake + 1); // Increment water intake by 1 cup
  };

  return (
    <>
    <Navbar/>
      <Head>
        <title>Track Your Goals</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-blue-100 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600">Track your Goals</h1>

        {/* Content */}
        <div className="flex justify-center items-start mt-10 space-x-10">
          {/* Water Intake Tracker */}
          <div className="bg-blue-300 p-6 rounded-lg shadow-md w-72">
            <h2 className="text-xl font-bold text-white">Daily Water Intake Tracker</h2>
            <div className="flex justify-center items-center mt-6">
              {/* Bottle Image */}
              <div className="relative w-16 h-32 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Water Level */}
                <div
                  className="absolute bottom-0 left-0 w-full bg-blue-400"
                  style={{ height: `${(waterIntake / 8) * 100}%` }} // Dynamically calculate water level
                ></div>
              </div>
            </div>
            <button
              onClick={handleAddWater}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600"
            >
              + 1 cup / 200ml
            </button>
          </div>

          {/* Other Goals */}
          <div className="flex flex-col space-y-6">
            {/* Steps Walked */}
            <div className="flex items-center space-x-4">
              <label className="text-lg text-gray-700 font-medium">Steps walked:</label>
              <input
                type="text"
                placeholder="5000"
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sleep Duration */}
            <div className="flex items-center space-x-4">
              <label className="text-lg text-gray-700 font-medium">Sleep duration:</label>
              <input
                type="text"
                placeholder="7 hours"
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Extra Activities */}
            <div className="flex items-center space-x-4">
              <label className="text-lg text-gray-700 font-medium">Extra activities:</label>
              <input
                type="text"
                placeholder="cycling"
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrackGoals;

