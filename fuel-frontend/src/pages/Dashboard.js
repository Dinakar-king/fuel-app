import React from 'react';
import { Link } from 'react-router-dom';

// You can add icons from a library like 'react-icons' later
// import { FaGasPump, FaTools } from 'react-icons/fa';

export default function Dashboard({ token }) {
  // You could use the token to fetch user data here, like their name

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to your Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Book Fuel */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {/* <FaGasPump className="text-4xl text-blue-500" /> */}
              <span className="text-4xl">⛽</span>
              <h2 className="text-2xl font-bold text-gray-700">Book Fuel</h2>
            </div>
            <p className="mt-4 text-gray-600">
              Need a refill? Get fuel delivered directly to your location, 24/7.
            </p>
            <Link 
              to="/booking" 
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Card 2: Book Service */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {/* <FaTools className="text-4xl text-green-500" /> */}
              <span className="text-4xl">🛠️</span>
              <h2 className="text-2xl font-bold text-gray-700">Book a Service</h2>
            </div>
            <p className="mt-4 text-gray-600">
              Vehicle troubles? Our mobile mechanics are ready to help.
            </p>
            <Link 
              to="/service" 
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition"
            >
              Request Service
            </Link>
          </div>
        </div>

        {/* You can add more cards here, e.g., "My Booking History" */}
        
      </div>
    </div>
  );
}