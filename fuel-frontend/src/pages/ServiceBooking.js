import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceBooking({ token }) {
  const [vehicleType, setVehicleType] = useState('car'); // Default to 'car'
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // 1. Check for token on component load
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // 2. Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!token) {
      setError('You must be logged in to book a service.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // IMPORTANT: Send the auth token
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          vehicleType,
          description,
          address
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setDescription('');
        setAddress('');
        alert('Service booked successfully! Our team is on the way.');
        navigate('/dashboard');
      } else {
        setError(data.msg || 'Service booking failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Book a Vehicle Service
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Need help? Our mobile mechanics are ready.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Service Request Confirmed!
            </p>
          )}

          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">
              Select Vehicle Type
            </label>
            <select
              id="vehicleType"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              {/* These values come from your 'serviceSchema' enum */}
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Describe the Issue
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Flat tire, engine won't start..."
              value={description}
              onChange={(e) => setDescription(e.T.value)}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Your Location / Address
            </label>
            <textarea
              id="address"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the full address where your vehicle is located"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            disabled={!token}
          >
            Request Service
          </button>
        </form>
      </div>
    </div>
  );
}