import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage({ token }) {
  const [fuels, setFuels] = useState([]); // To store fuels from API
  const [selectedFuelId, setSelectedFuelId] = useState('');
  const [liters, setLiters] = useState('');
  const [address, setAddress] = useState('');
  
  // --- NEW STATE ---
  const [isUrgent, setIsUrgent] = useState(false); // For the checkbox
  const [totalPrice, setTotalPrice] = useState(0); // To calculate cost
  // --- END NEW STATE ---

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. Fetch available fuels when the component loads
  useEffect(() => {
    // Redirect to login if there's no token
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchFuels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fuels');
        if (response.ok) {
          const data = await response.json();
          setFuels(data);
          if (data.length > 0) {
            setSelectedFuelId(data[0]._id); // Default to the first fuel
          }
        } else {
          setError('Could not fetch fuel types.');
        }
      } catch (err) {
        setError('Network error. Could not fetch fuels.');
      }
    };

    fetchFuels();
  }, [token, navigate]); // Dependency array

  // --- NEW EFFECT to calculate price ---
  useEffect(() => {
    const selectedFuel = fuels.find(f => f._id === selectedFuelId);
    if (selectedFuel && liters > 0) {
      const price = selectedFuel.pricePerLiter * liters;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [liters, selectedFuelId, fuels]);
  // --- END NEW EFFECT ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('You must be logged in.');
      return;
    }

    const bookingDetails = {
      fuelId: selectedFuelId,
      liters: Number(liters),
      address: address
    };

    // --- MODIFIED LOGIC ---
    if (isUrgent) {
      // 1. URGENT (PRE-PAY) FLOW
      try {
        // Call your payment route first
        const paymentRes = await fetch('http://localhost:5000/api/payment/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Assuming your payment route is protected
          },
          body: JSON.stringify({ amount: totalPrice, currency: 'inr' })
        });
        
        const paymentData = await paymentRes.json();
        
        if (!paymentRes.ok) {
          throw new Error(paymentData.error || 'Failed to create payment.');
        }

        // 2. Navigate to the new Checkout page with payment details
        navigate('/checkout', { 
          state: { 
            clientSecret: paymentData.clientSecret,
            bookingDetails: bookingDetails,
            totalPrice: totalPrice
          } 
        });

      } catch (err) {
        setError(err.message);
      }
    } else {
      // 2. NORMAL (CASH ON DELIVERY) FLOW
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ ...bookingDetails, isPaid: false }) // Send isPaid flag
        });
        const data = await response.json();
        if (response.ok) {
          alert('Booking successful! Your fuel is on the way.');
          navigate('/dashboard');
        } else {
          setError(data.msg || 'Booking failed.');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      }
    }
    // --- END MODIFIED LOGIC ---
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Book Your Fuel
        </h2>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* --- THIS IS THE DROPDOWN BOX --- */}
          <div className="mb-4">
            <label htmlFor="fuelType" className="block text-gray-700 font-medium mb-2">Select Fuel Type</label>
            <select 
              id="fuelType" 
              className="w-full p-3 rounded-lg border border-gray-300" 
              value={selectedFuelId} 
              onChange={(e) => setSelectedFuelId(e.target.value)} 
              required
            >
              <option value="" disabled>Loading fuels...</option>
              {fuels.map((fuel) => (
                <option key={fuel._id} value={fuel._id}>
                  {fuel.name} - ₹{fuel.pricePerLiter}/liter
                </option>
              ))}
            </select>
          </div>
          {/* --- END OF DROPDOWN BOX --- */}

          <div className="mb-4">
            <label htmlFor="liters" className="block text-gray-700 font-medium mb-2">Quantity (Liters)</label>
            <input type="number" id="liters" className="w-full p-3 rounded-lg border border-gray-300" placeholder="e.g., 20" min="1" value={liters} onChange={(e) => setLiters(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Delivery Address</label>
            <textarea id="address" rows="4" className="w-full p-3 rounded-lg border border-gray-300" placeholder="Enter your full delivery address" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
          </div>
          
          {/* --- URGENT CHECKBOX --- */}
          <div className="mb-4">
            <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <input
                id="urgent-checkbox"
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-3">
                <label htmlFor="urgent-checkbox" className="font-bold text-blue-800">
                  Urgent Booking (Pre-pay now)
                </label>
                <p className="text-sm text-blue-700">Select this for priority delivery. Requires online payment.</p>
              </div>
            </div>
          </div>
          {/* --- END URGENT CHECKBOX --- */}
          
          {/* --- DYNAMIC TOTAL --- */}
          {totalPrice > 0 && (
            <div className="text-center my-4">
              <span className="text-xl font-bold text-gray-800">
                Total: ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          )}
          {/* --- END DYNAMIC TOTAL --- */}

          <button
            type="submit"
            className={`w-full text-white font-bold py-3 rounded-lg transition duration-300 ${isUrgent ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={!token || fuels.length === 0 || !liters || !address}
          >
            {isUrgent ? 'Proceed to Payment' : 'Confirm Booking (Pay on Delivery)'}
          </button>
        </form>
      </div>
    </div>
  );
}
