
import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface MenuSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ searchQuery, setSearchQuery, onAddToOrder }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [recentlyAdded, setRecentlyAdded] = useState<Record<string, boolean>>({});

  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

  const handleAdd = (item: MenuItem) => {
    onAddToOrder(item);
    setRecentlyAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setRecentlyAdded(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="menu" className="py-40 bg-parchment relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Artistic Section Header */}
        <div className="text-center mb-32 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#8B0000]"></div>
            <span className="text-[#8B0000] font-black uppercase tracking-[0.6em] text-[10px]">La Carta</span>
            <div className="h-px w-8 bg-[#8B0000]"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-[#1A1A1A] heading-font italic leading-none mb-8">Crafted with Heritage</h2>
          <p className="max-w-xl mx-auto text-gray-400 font-light italic text-lg">
            Each ingredient is sourced directly from regional producers, ensuring the spirit of Mexican terroir in every bite.
          </p>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-12 py-3.5 border-b-2 transition-all font-black text-[10px] uppercase tracking-[0.4em] ${
                activeCategory === cat 
                ? 'border-[#8B0000] text-[#1A1A1A] scale-105' 
                : 'border-transparent text-gray-300 hover:text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sophisticated Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredItems.map(item => (
            <div key={item.id} className="group flex flex-col">
              <div className="relative h-[450px] overflow-hidden mb-8 shadow-2xl transition-transform duration-700 hover:-translate-y-2">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />
                
                {/* Floating Price Badge */}
                <div className="absolute bottom-6 left-6 bg-white py-3 px-6 shadow-2xl text-[#1A1A1A] font-black text-sm tracking-widest">
                  ${item.price.toFixed(2)}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-[#1A1A1A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button 
                    onClick={() => handleAdd(item)}
                    className={`bg-white text-[#1A1A1A] px-10 py-4 font-black text-[10px] uppercase tracking-[0.3em] transition-all transform translate-y-4 group-hover:translate-y-0 active:scale-95 ${recentlyAdded[item.id] ? 'bg-green-600 text-white' : 'hover:bg-[#C5A059] hover:text-white'}`}
                  >
                    {recentlyAdded[item.id] ? '✓ Added to Cart' : 'Add to Order'}
                  </button>
                </div>
                
                {item.isVegetarian && (
                  <div className="absolute top-6 left-6 bg-[#2E8B57] text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                    Vegetariano
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h3 className="text-2xl font-black text-[#1A1A1A] heading-font italic tracking-tight group-hover:text-[#8B0000] transition-colors">{item.name}</h3>
                  <div className="flex gap-1 shrink-0">
                    {[...Array(item.spicyLevel)].map((_, i) => (
                      <span key={i} className="text-sm">🌶️</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
