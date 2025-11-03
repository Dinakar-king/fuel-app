import React from 'react';
// We'll add a background image URL here
// For now, it's just a dark background

export default function Hero() {
  return (
    // You will need to add your background image here
    // Example: style={{ backgroundImage: "url('/your-refinery-image.jpg')" }}
    <div className="relative h-screen bg-cover bg-center bg-gray-800">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-white p-8 md:p-24">
        <p className="text-lg font-semibold text-green-400 mb-2">
          Welcome to FuelNow
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Redefining the Power Behind
          <br />
          Smart & Simple Energy
        </h1>
        <p className="text-xl mb-6">
          Order fuel and get service at your door within an hour.
        </p>
        <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded hover:bg-green-600">
          Order Fuel
        </button>
      </div>
      
    </div>
  );
}