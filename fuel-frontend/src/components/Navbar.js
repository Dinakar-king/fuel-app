import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

export default function Navbar({ token, logout }) {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-500">
          FuelNow
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/booking" className="hover:text-green-400">Booking</Link>
          <Link to="/service" className="hover:text-green-400">Service</Link>
          <Link to="/contact" className="hover:text-green-400">Contact</Link>
          <Link to="/faq" className="hover:text-green-400">FAQ</Link>
        </div>

        {/* Login/Signup or Dashboard/Logout */}
        <div className="hidden md:flex space-x-4 items-center">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
              <button 
                onClick={logout}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-400">Login</Link>
              <Link 
                to="/signup" 
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}