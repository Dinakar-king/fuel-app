import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// ⚠️ IMPORTANT: Add your STRIPE PUBLISHABLE KEY here
// This key is different from your SECRET KEY. It's safe to use in the frontend.
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

// This is the inner component that has access to Stripe
const CheckoutForm = ({ clientSecret, bookingDetails, totalPrice, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    setIsProcessing(true);
    setError(null);

    // 1. Confirm the payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // This return_url is not strictly needed here since we handle the result
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: 'if_required', // Prevents automatic redirect
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
      return;
    }

    // 2. If payment is successful, NOW create the booking
    if (paymentIntent.status === 'succeeded') {
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          // Send the booking details AND the payment info
          body: JSON.stringify({ 
            ...bookingDetails, 
            isPaid: true,
            paymentId: paymentIntent.id // Store the payment ID
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Payment Successful! Your priority booking is confirmed.');
          navigate('/dashboard');
        } else {
          setError(data.msg || 'Payment succeeded but booking failed. Please contact support.');
        }

      } catch (err) {
        setError('Payment succeeded but booking creation failed. Please contact support.');
      }
    } else {
      setError('Payment was not successful. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">Pay ₹{totalPrice.toFixed(2)}</h3>
      <PaymentElement id="payment-element" />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 mt-6"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay Now"}
        </span>
      </button>
      {error && <div id="payment-message" className="text-red-500 mt-4 text-center">{error}</div>}
    </form>
  );
};

// This is the main page component that loads Stripe
export default function CheckoutPage() {
  const { state } = useLocation();
  const token = localStorage.getItem('token'); // Get token for the form

  if (!state || !state.clientSecret || !state.bookingDetails) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p>No payment details found. Please try booking again.</p>
      </div>
    );
  }

  const { clientSecret, bookingDetails, totalPrice } = state;

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Complete Your Payment
        </h2>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm 
            clientSecret={clientSecret}
            bookingDetails={bookingDetails}
            totalPrice={totalPrice}
            token={token}
          />
        </Elements>
      </div>
    </div>
  );
}