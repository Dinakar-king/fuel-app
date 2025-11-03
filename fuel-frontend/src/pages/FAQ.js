import React, { useState } from 'react';

// This component will manage its own open/closed state
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        className="flex justify-between items-center w-full py-5 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5 px-6">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

// Your main FAQ page component
export default function FAQ() {
  const faqData = [
    {
      question: 'How do I book a fuel delivery?',
      answer:
        'You can book a fuel delivery by logging into your account and navigating to the "Booking" page. Select your fuel type, quantity, and provide your delivery address.',
    },
    {
      question: 'Is pre-payment required for all orders?',
      answer:
        'No, pre-payment is optional. We offer a "Pay on Delivery" option for regular bookings. Pre-payment is only required if you select the "Urgent Booking" option for priority delivery.',
    },
    {
      question: 'What are your delivery times?',
      answer:
        'Our standard delivery time is within 60 minutes of confirming your order. Urgent bookings are prioritized and typically arrive sooner.',
    },
    {
      question: 'What types of services do you offer?',
      answer:
        'Besides fuel delivery, we offer on-site vehicle services like flat tire assistance, engine diagnostics, and battery jump-starts. You can book these from the "Service" page.',
    },
    {
      question: 'How do I update my delivery address?',
      answer:
        'You enter your delivery address for each booking. We do not store a permanent address, giving you the flexibility to order fuel wherever you are.',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="rounded-lg overflow-hidden border border-gray-200">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
