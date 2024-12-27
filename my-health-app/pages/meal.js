import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

const FoodPlan = () => {
  const [dietType, setDietType] = useState('Veg'); // State to track selected diet type

  const handleDietChange = (diet) => {
    setDietType(diet); // Update the diet type
  };

  return (
    <>
    <Navbar />
      <Head>
        <title>Your Food Plan</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600">Your Food Plan</h1>

        {/* Diet Type Selector */}
        <div className="flex justify-center mt-6 space-x-4">
          {['Veg', 'Non Veg', 'Vegan'].map((type) => (
            <button
              key={type}
              onClick={() => handleDietChange(type)}
              className={`px-4 py-2 rounded-full ${
                dietType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Food Plan Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 md:px-16">
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <div
              key={day}
              className="bg-blue-200 p-6 rounded-lg shadow-md text-gray-700 space-y-2"
            >
              <h2 className="text-lg font-bold">DAY {day}</h2>
              <p>
                <span className="font-semibold">Breakfast:</span> 3 idlis, coriander chutney
              </p>
              <p>
                <span className="font-semibold">Lunch:</span> 75g rice, 2 tbsp coconut curry, 20g
                spinach
              </p>
              <p>
                <span className="font-semibold">Dinner:</span> 75g rice, 2 tbsp coconut curry, 20g
                spinach
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default FoodPlan;
