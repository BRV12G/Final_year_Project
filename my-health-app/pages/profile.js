import Head from 'next/head';
import Navbar from "C:/Users/Admin/Documents/final year project/nextjsproject/my-health-app/components/Navbar"

const ProfilePage = () => {
  return (
    <>
    <Navbar />
      <Head>
        <title>Willora's Profile</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-100">
        <div className="flex items-center bg-white shadow-lg rounded-lg p-8 max-w-4xl">
          {/* Profile Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Willora's Profile</h1>
            <ul className="text-gray-700 space-y-3">
              <li>
                <strong className="text-gray-500">Name:</strong>{' '}
                <span className="font-medium">Willora Da Costa</span>
              </li>
              <li>
                <strong className="text-gray-500">Username:</strong>{' '}
                <span className="font-medium">WilloraDaCosta</span>
              </li>
              <li>
                <strong className="text-gray-500">Email:</strong>{' '}
                <span className="font-medium">willoradacosta@gmail.com</span>
              </li>
              <li>
                <strong className="text-gray-500">Age:</strong>{' '}
                <span className="font-medium">21</span>
              </li>
              <li>
                <strong className="text-gray-500">Gender:</strong>{' '}
                <span className="font-medium">Female</span>
              </li>
              <li>
                <strong className="text-gray-500">Occupation:</strong>{' '}
                <span className="font-medium">Student</span>
              </li>
            </ul>
            <div className="mt-6 space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-200 text-blue-500 rounded shadow hover:bg-gray-300">
                Change Password
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className="ml-10 hidden md:block">
            <img
              src="/profile_avatar.png"
              alt="Avatar"
              className="w-48 h-auto"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
