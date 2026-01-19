
import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldAnimateCart, setShouldAnimateCart] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setShouldAnimateCart(true);
      const timer = setTimeout(() => setShouldAnimateCart(false), 300);
      prevCount.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      isScrolled 
      ? 'bg-[#1A1A1A]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
      : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Brand Logo Section */}
        <a href="#home" className="flex flex-col items-center group relative">
          <span className={`text-2xl md:text-3xl font-black tracking-[0.3em] heading-font transition-all duration-500 ${
            isScrolled ? 'text-[#C5A059]' : 'text-white'
          } group-hover:scale-105`}>
            LAS CANTERAS
          </span>
          <span className={`text-[9px] uppercase tracking-[0.6em] font-bold transition-all duration-500 mt-1 ${
            isScrolled ? 'text-white/40' : 'text-[#C5A059]'
          }`}>
            Authentic Mexican Grill
          </span>
        </a>

        {/* Central Search Integration */}
        <div className="hidden lg:flex flex-1 max-w-md mx-16 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our cuisine..."
            className={`w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-12 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition-all placeholder:text-white/20 text-white text-sm`}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-10 font-bold text-[10px] uppercase tracking-[0.4em] text-white/70">
            <a href="#menu" className="hover:text-[#C5A059] transition-colors relative group">
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
            </a>
            <a href="#reservations" className="hover:text-[#C5A059] transition-colors relative group">
              Reservations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
            </a>
          </div>
          
          <button 
            onClick={onOpenCart}
            className={`relative p-3 rounded-full transition-all bg-white/5 hover:bg-white/10 border border-white/10 active:scale-90 ${
              shouldAnimateCart ? 'animate-cart-bump' : ''
            }`}
          >
            <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg ring-2 ring-[#1A1A1A]">
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
