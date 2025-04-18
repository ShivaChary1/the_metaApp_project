import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Demo from './Demo';
import Tech from './Tech';
import CTA from './CTA';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      <Hero />
      <Features />
      <Demo />
      <Tech />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;