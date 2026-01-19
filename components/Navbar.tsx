
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
      ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex-shrink-0 group flex flex-col items-center">
          <span className={`text-2xl md:text-3xl font-black tracking-widest heading-font transition-colors duration-300 ${
            isScrolled ? 'text-canteras-red' : 'text-white'
          }`}>
            LAS CANTERAS
          </span>
          <span className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-300 ${
            isScrolled ? 'text-canteras-gold' : 'text-canteras-gold'
          }`}>
            Mexican Grill
          </span>
        </a>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-sm mx-12 relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our cuisine..."
            className={`w-full border-b-2 bg-transparent py-2 px-8 focus:outline-none transition-all duration-300 ${
              isScrolled 
              ? 'border-gray-200 focus:border-canteras-red text-gray-800' 
              : 'border-white/30 focus:border-canteras-gold text-white placeholder:text-white/60'
            }`}
          />
          <svg className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            isScrolled ? 'text-gray-400' : 'text-white/60'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <div className={`hidden lg:flex gap-8 font-bold text-[11px] uppercase tracking-[0.2em] ${
            isScrolled ? 'text-gray-600' : 'text-white/80'
          }`}>
            <a href="#menu" className="hover:text-canteras-red transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-canteras-gold transition-colors">Book a Table</a>
          </div>
          
          <button 
            onClick={onOpenCart}
            className={`relative p-2 transition-all hover:scale-110 active:scale-90 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-canteras-red text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
