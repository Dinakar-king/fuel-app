import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import your pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import ServiceBooking from './pages/ServiceBooking';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';

// --- Our New Imports ---
import Navbar from './components/Navbar'; // Import the new Navbar
import HomePage from './pages/HomePage'; // Import the new HomePage
import CheckoutPage from './pages/CheckoutPage'; // ✅ IMPORT FOR THE NEW PAGE

function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  }, []); 

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return (
    <div>
      {/* Pass the token and logout function to our new Navbar */}
      <Navbar token={token} logout={logout} />

      {/* This padding is on all pages except the full-screen Hero.
        You can remove it if you want.
      */}
      <div style={{ padding: 16 }}>
        <Routes>
          {/* --- Your Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setToken={t=>{ localStorage.setItem('token', t); setToken(t); }} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/booking" element={<BookingPage token={token} />} />
          <Route path="/service" element={<ServiceBooking token={token} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* --- ✅ NEW ROUTE FOR PAYMENT --- */}
          <Route path="/checkout" element={<CheckoutPage />} />
          
        </Routes>
      </div>
    </div>
  );
}
export default App;
