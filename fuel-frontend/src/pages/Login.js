import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      // ✅ MODIFIED to point to your real backend route
      const response = await fetch('http://localhost:5000/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); // This is correct, your backend sends a 'token'
        navigate('/dashboard'); 
      } else {
        setError(data.msg || 'Login failed. Please check your credentials.'); // Your backend sends 'msg'
      }
    } catch (err) {
      setError('Network error or server unavailable.');
      console.error('Login error:', err);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-blue-500 overflow-hidden relative"
      // Example simple background. Use your own image if you have one.
      style={{ backgroundImage: "linear-gradient(to right top, #24294d, #2f345c, #393f6b, #444a7b, #4f558b)" }}
    >
        {/* Animated blobs for background effect */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative z-10 p-8 rounded-xl shadow-lg w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-gray-200"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-gray-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/forgot-password" className="text-sm text-blue-200 hover:underline mt-2 block text-right">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Sign in
          </button>
        </form>

        <div className="text-center my-6 text-gray-300">
          or continue with
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition duration-300">
            {/* Google Icon SVG */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.27v2.4h6.7c-.31 1.76-1.47 4.14-4.83 4.14-2.92 0-5.32-2.3-5.32-5.18s2.4-5.18 5.32-5.18c1.55 0 2.65.65 3.25 1.25l1.9-1.9c-1.1-1.07-2.6-1.87-5.15-1.87-4.37 0-7.9 3.53-7.9 7.9s3.53 7.9 7.9 7.9c4.95 0 8.1-3.4 8.1-7.85 0-.52-.05-1.03-.13-1.55H12.24z" />
            </svg>
          </button>
          {/* Other social icons removed for brevity */}
        </div>

        <div className="text-center text-sm">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-blue-200 hover:underline font-medium">
            Register for free
          </Link>
        </div>
      </div>
    </div>
  );
}