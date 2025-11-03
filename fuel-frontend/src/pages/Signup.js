import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  // Your backend only needs email and password for signup, but we can add name
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); 

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // ✅ MODIFIED to point to your real backend route
      const response = await fetch('http://localhost:5000/api/auth/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Your backend route also accepts 'name' and 'vehicleType'
        body: JSON.stringify({ name, email, password, vehicleType: 'none' }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup is successful, navigate to login
        navigate('/login'); 
        alert('Signup successful! Please log in.');
      } else {
        setError(data.msg || 'Signup failed. Please try again.'); // Your backend sends 'msg'
      }
    } catch (err) {
      setError('Network error or server unavailable.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-green-500 p-4"
    >
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // You can make this required if your backend requires it
          />
          <input
            type="email"
            placeholder="e-mail"
            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="repeat password"
            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* ... other form elements like 'remember me' or social icons ... */}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-bold py-4 rounded-xl transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
          >
            Sign up
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}