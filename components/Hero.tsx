
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Cinematic Background */}
      <div 
        className="absolute inset-0 z-0 scale-105 animate-slow-zoom opacity-70"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10,10,10,1)), url('https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Floating Content */}
      <div className="relative z-10 text-center text-white px-6 pt-64 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up">
          <div className="h-px w-12 bg-[#C5A059]"></div>
          <h2 className="text-[#C5A059] text-xs md:text-sm uppercase tracking-[0.8em] font-black">Establecido 1998</h2>
          <div className="h-px w-12 bg-[#C5A059]"></div>
        </div>

        <h1 className="text-6xl md:text-9xl font-bold mb-10 leading-[0.9] heading-font tracking-tighter animate-fade-in-up">
          The <span className="text-gold-gradient italic">Soul</span> of <br/>
          Ancient Flavor
        </h1>
        
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-16 text-white/60 font-light italic leading-relaxed animate-fade-in-up">
          Experience a curated journey through Mexico's culinary heritage, where every dish is a hand-crafted legacy of fire and spice.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in-up">
          <a 
            href="#menu" 
            className="btn-premium bg-[#8B0000] text-white px-14 py-5 rounded-none font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all hover:-translate-y-1"
          >
            Explore Menu
          </a>
          <a 
            href="#reservations" 
            className="btn-premium bg-transparent border border-white/20 text-white px-14 py-5 rounded-none font-black text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all hover:-translate-y-1"
          >
            Book Table
          </a>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white">Scroll to Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C5A059] to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;
