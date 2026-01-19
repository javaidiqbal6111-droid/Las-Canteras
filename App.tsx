
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

  // Persistence logic
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

  // Cart Operations
  const addToOrder = (item: MenuItem) => {
    if (activeOrder) {
      alert("You have an active order being prepared. Please track it in your order summary.");
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

  // Order Flow
  const handlePlaceOrder = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
  };

  const handleCancelOrder = (id: string) => {
    setActiveOrder(null);
    alert(`Refund Complete. Your payment for order ${id} has been returned to your card.`);
  };

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-parchment selection:bg-canteras-gold selection:text-white antialiased overflow-x-hidden">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      {/* We use relative positioning and no top padding on main to allow Hero to sit perfectly under Navbar */}
      <main>
        <Hero />
        
        {/* Quality Banner - Elevated Design */}
        <div className="bg-canteras-red py-24 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-white text-center relative z-10">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:bg-canteras-gold/30 transition-all duration-500 shadow-2xl">🌮</div>
              <h4 className="font-bold text-2xl heading-font italic mb-4">Oaxacan Heritage</h4>
              <p className="text-sm opacity-70 max-w-[240px] leading-relaxed font-light italic">Nixtamalized corn pressed by hand, following ancient family traditions.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:bg-canteras-gold/30 transition-all duration-500 shadow-2xl">🍹</div>
              <h4 className="font-bold text-2xl heading-font italic mb-4">Agave Curation</h4>
              <p className="text-sm opacity-70 max-w-[240px] leading-relaxed font-light italic">Over 40 rare tequilas and mezcals aged specifically in white oak barrels.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:bg-canteras-gold/30 transition-all duration-500 shadow-2xl">🔥</div>
              <h4 className="font-bold text-2xl heading-font italic mb-4">Mesquite Grilling</h4>
              <p className="text-sm opacity-70 max-w-[240px] leading-relaxed font-light italic">Traditional wood-fired ovens that impart the ultimate smoky depth.</p>
            </div>
          </div>
        </div>

        <MenuSection 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onAddToOrder={addToOrder} 
        />
        
        {/* Social Proof - Increased height for drama */}
        <section className="py-48 bg-white relative overflow-hidden flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-3 mb-10 opacity-30">
              {[...Array(5)].map((_, i) => <span key={i} className="text-canteras-gold text-3xl">★</span>)}
            </div>
            <p className="text-4xl md:text-6xl font-black italic text-gray-900 mb-16 leading-[1.2] heading-font">
              "An unparalleled journey through the heart of Mexico. The attention to detail is breathtaking."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center text-2xl border-2 border-canteras-gold mb-5 text-canteras-gold shadow-lg">✨</div>
              <p className="font-black text-gray-900 tracking-[0.4em] uppercase text-xs">Esteban De La Riva</p>
              <p className="text-[10px] text-canteras-red font-black mt-2 uppercase tracking-[0.3em] opacity-60">Master Sommelier & Critic</p>
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
