
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { MenuItem, CartItem, Order } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('last_order');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Date.now() - parsed.timestamp < 3600000) {
          setActiveOrder(parsed);
        }
      } catch (e) { console.error("Restore failed", e); }
    }
  }, []);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('last_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('last_order');
    }
  }, [activeOrder]);

  const addToOrder = (item: MenuItem) => {
    if (activeOrder) {
      alert("Active order in progress. Track it in your summary.");
      setIsCartOpen(true);
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handlePlaceOrder = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
  };

  const handleCancelOrder = (id: string) => {
    setActiveOrder(null);
  };

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-parchment selection:bg-[#C5A059] selection:text-white antialiased">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        
        {/* New Feature: Our Story / Philosophy Section */}
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FCF9F2] -z-10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                className="rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Culinary Craft"
              />
              <div className="absolute -bottom-12 -right-12 bg-[#8B0000] p-12 text-white hidden md:block rounded-3xl shadow-2xl">
                <span className="text-4xl font-black heading-font italic">25+</span>
                <p className="text-[10px] uppercase tracking-widest mt-2">Years of Tradition</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-xs">Our Philosophy</span>
                <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] heading-font italic">Born from the Hearth</h2>
              </div>
              <p className="text-xl text-gray-500 leading-relaxed font-light italic">
                "Las Canteras is more than a kitchen; it is a celebration of the 'fogon'—the ancestral hearth where smoke and memory meet. Every tortilla is pressed by hands that remember the rhythm of Oaxaca."
              </p>
              <div className="pt-8">
                 <a href="#menu" className="inline-flex items-center gap-4 text-[#8B0000] font-black uppercase tracking-[0.3em] text-sm group">
                   See the Craft
                   <div className="w-12 h-px bg-[#8B0000] transition-all group-hover:w-20"></div>
                 </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Banner - Elevated */}
        <div className="bg-[#1A1A1A] py-32 overflow-hidden relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-24 text-white text-center">
            {[
              { icon: '🌮', title: 'Oaxacan Heritage', desc: 'Nixtamalized corn pressed by hand following ancient secrets.' },
              { icon: '🍹', title: 'Agave Curation', desc: 'Over 40 rare mezcals aged specifically in white oak.' },
              { icon: '🔥', title: 'Mesquite Fire', desc: 'Wood-fired ovens that impart deep, primitive smoke.' }
            ].map((feature, idx) => (
              <div key={idx} className="space-y-6 group">
                <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500">{feature.icon}</div>
                <h4 className="text-2xl heading-font italic text-[#C5A059]">{feature.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <MenuSection 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onAddToOrder={addToOrder} 
        />
        
        {/* Social Proof Dramatic Redesign */}
        <section className="py-64 bg-[#FCF9F2] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
          </div>
          <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
            <h3 className="text-4xl md:text-7xl font-black italic text-[#1A1A1A] mb-20 leading-tight heading-font">
              "An unparalleled journey through Mexico's heart. Breathtaking detail."
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-px h-12 bg-[#C5A059] mb-8"></div>
              <p className="font-black text-[#1A1A1A] tracking-[0.6em] uppercase text-[10px]">Esteban De La Riva</p>
              <p className="text-[9px] text-[#8B0000] font-black mt-3 uppercase tracking-[0.4em]">Master Sommelier</p>
            </div>
          </div>
        </section>

        <ReservationSection />
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onPlaceOrder={handlePlaceOrder}
        activeOrder={activeOrder}
        onCancelOrder={handleCancelOrder}
      />
      
      <AIAssistant />
      <Footer />
    </div>
  );
};

export default App;
