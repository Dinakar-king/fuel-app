import React from 'react';
import Hero from '../components/Hero'; // Import the Hero component

export default function HomePage() {
  return (
    <div>
      {/* This renders the big hero section */}
      <Hero />
      
      {/* You can add more sections (like "Our Services", "About Us") here, below the Hero */}
    </div>
  );
}