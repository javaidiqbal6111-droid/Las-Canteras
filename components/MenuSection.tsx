
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
  const [isReserving, setIsReserving] = useState(false);

  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

  // Logic for the Daily Special feature
  const dailySpecial = useMemo(() => MENU_ITEMS.find(i => i.id === '4'), []);

  const handleAdd = (item: MenuItem) => {
    onAddToOrder(item);
    setRecentlyAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setRecentlyAdded(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleSpecialReserve = (item: MenuItem) => {
    setIsReserving(true);
    setTimeout(() => {
      onAddToOrder(item);
      setIsReserving(false);
      setRecentlyAdded(prev => ({ ...prev, [item.id]: true }));
      setTimeout(() => setRecentlyAdded(prev => ({ ...prev, [item.id]: false })), 1500);
    }, 800);
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
    <section id="menu" className="py-32 bg-parchment relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-24 animate-fade-in-up">
          <span className="text-canteras-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Gourmet Traditions</span>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 heading-font italic">Discover the Soul of Mexico</h2>
          <div className="w-24 h-1 bg-canteras-red mx-auto mt-8 opacity-30"></div>
        </div>

        {/* NEW FEATURE: Chef's Daily Special Spotlight */}
        {dailySpecial && searchQuery === '' && activeCategory === 'All' && (
          <div className="mb-24 animate-fade-in-up delay-100">
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gray-100 group">
              <div className="lg:w-1/2 relative overflow-hidden">
                <img 
                  src={dailySpecial.image} 
                  alt={dailySpecial.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 min-h-[400px]" 
                />
                <div className="absolute top-10 left-10 bg-canteras-gold text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
                  La Especialidad del Día
                </div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-px w-12 bg-canteras-red"></div>
                   <span className="text-canteras-red font-bold uppercase tracking-widest text-xs">Today's Highlight</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 heading-font italic">{dailySpecial.name}</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-10 italic">
                  "{dailySpecial.description} Experience the depth of our mesquite-grilled flavors, crafted specifically for today's menu."
                </p>
                <div className="flex items-center justify-between">
                   <span className="text-3xl font-black text-gray-900">${dailySpecial.price.toFixed(2)}</span>
                   <button 
                    disabled={isReserving}
                    onClick={() => handleSpecialReserve(dailySpecial)}
                    className={`shimmer-button text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-3 ${isReserving ? 'opacity-70 cursor-not-allowed' : ''}`}
                   >
                     {isReserving ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                     ) : null}
                     {recentlyAdded[dailySpecial.id] ? '✓ Reserved!' : 'Reserve for Dinner'}
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-3 rounded-full border-2 transition-all font-black text-[10px] uppercase tracking-[0.2em] ${
                activeCategory === cat 
                ? 'bg-canteras-red border-canteras-red text-white shadow-xl scale-105' 
                : 'border-gray-200 text-gray-400 hover:border-canteras-red hover:text-canteras-red bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredItems.map(item => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 flex flex-col">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-8 right-8 bg-white/95 backdrop-blur px-5 py-2 rounded-2xl text-canteras-red font-black shadow-xl text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.isVegetarian && (
                    <div className="absolute top-8 left-8 bg-canteras-green text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                      Planta
                    </div>
                  )}
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-canteras-red transition-colors duration-300">{item.name}</h3>
                    <div className="flex gap-1 shrink-0">
                      {[...Array(item.spicyLevel)].map((_, i) => (
                        <span key={i} title="Picante" className="text-lg">🌶️</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1 italic">
                    {item.description}
                  </p>
                  <button 
                    onClick={() => handleAdd(item)}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-sm active:scale-[0.98] border-2 ${
                      recentlyAdded[item.id] 
                      ? 'bg-canteras-green border-canteras-green text-white' 
                      : 'bg-parchment border-canteras-gold/20 text-canteras-gold hover:bg-canteras-gold hover:text-white hover:shadow-xl'
                    }`}
                  >
                    {recentlyAdded[item.id] ? '✓ Added to Cart!' : 'Add to Selection'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-black text-gray-300 italic heading-font">No match for your search...</h3>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}} 
              className="mt-6 text-canteras-red font-black text-sm uppercase tracking-widest hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
