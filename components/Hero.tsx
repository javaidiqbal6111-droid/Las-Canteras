
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 scale-105 animate-slow-zoom"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-canteras-gold text-xl md:text-2xl uppercase tracking-[0.3em] mb-4">Sabor de México</h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
          Experience the Soul of <br/>
          <span className="text-canteras-gold italic">Authentic</span> Flavors
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200">
          From the heart of Mexico to your table. Handcrafted recipes, local ingredients, and a legacy of passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#menu" 
            className="bg-canteras-red hover:bg-red-800 text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            Explore Menu
          </a>
          <a 
            href="#reservations" 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-canteras-red text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            Book a Table
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
