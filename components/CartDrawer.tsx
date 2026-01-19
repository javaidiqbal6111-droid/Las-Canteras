
import React, { useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onPlaceOrder: (order: Order) => void;
  activeOrder: Order | null;
  onCancelOrder: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, items, onUpdateQuantity, onRemove, onPlaceOrder, activeOrder, onCancelOrder 
}) => {
  const [step, setStep] = useState<'cart' | 'payment' | 'processing' | 'success'>('cart');
  const [isRefunding, setIsRefunding] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('preparing');
  
  const TAX_RATE = 0.0825;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Sync internal step and status with activeOrder
  useEffect(() => {
    if (activeOrder) {
      if (step !== 'success' && step !== 'processing') {
        setStep('success');
      }
      setCurrentStatus(activeOrder.status);

      // Simulate status progression if order is active
      if (activeOrder.status === 'preparing') {
        const timer = setTimeout(() => setCurrentStatus('ready'), 10000); // 10s to Ready
        return () => clearTimeout(timer);
      } else if (activeOrder.status === 'ready') {
        const timer = setTimeout(() => setCurrentStatus('delivered'), 10000); // 10s to Delivered
        return () => clearTimeout(timer);
      }
    } else {
      if (step === 'success') setStep('cart');
    }
  }, [activeOrder, step]);

  const handleCheckout = () => setStep('payment');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    setTimeout(() => {
      const newOrder: Order = {
        id: `LC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        items: [...items],
        subtotal,
        tax,
        total,
        status: 'preparing',
        timestamp: Date.now()
      };
      onPlaceOrder(newOrder);
    }, 2000);
  };

  const handleRefundRequest = async () => {
    if (!activeOrder) return;
    if (window.confirm("Confirm cancellation? This will trigger an immediate refund via Stripe.")) {
      setIsRefunding(true);
      setTimeout(() => {
        onCancelOrder(activeOrder.id);
        setIsRefunding(false);
        resetAndClose();
      }, 1500);
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => setStep('cart'), 500);
  };

  const getStatusIndex = (status: OrderStatus) => {
    switch(status) {
      case 'preparing': return 0;
      case 'ready': return 1;
      case 'delivered': return 2;
      default: return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={resetAndClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          
          <div className="p-6 border-b flex items-center justify-between bg-canteras-red text-white">
            <div>
              <h2 className="text-xl font-bold heading-font uppercase tracking-wider">
                {step === 'cart' && 'Your Selection'}
                {step === 'payment' && 'Payment Details'}
                {step === 'processing' && 'Secure Payment'}
                {step === 'success' && 'Live Order Tracker'}
              </h2>
              {step === 'payment' && <p className="text-[10px] uppercase tracking-widest text-white/70">Powered by Stripe</p>}
              {step === 'success' && <p className="text-[10px] uppercase tracking-widest text-white/70">Order ID: {activeOrder?.id}</p>}
            </div>
            <button onClick={resetAndClose} className="hover:rotate-90 transition-transform p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {step === 'cart' && (
              <div className="space-y-6">
                {items.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400">
                    <span className="text-5xl mb-4">🍽️</span>
                    <p className="heading-font text-lg italic">Your table is empty.</p>
                    <button onClick={resetAndClose} className="mt-4 text-canteras-red font-bold underline underline-offset-4">Explore our menu</button>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 group animate-fade-in">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl shadow-sm" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-canteras-red transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                        <p className="text-canteras-red font-bold text-sm mb-3">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-parchment transition-colors">-</button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-parchment transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="animate-fade-in space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Checkout Summary</p>
                  <div className="flex justify-between text-xl font-black text-gray-900">
                    <span>Amount to Pay</span>
                    <span className="text-canteras-red">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-gray-400 uppercase absolute left-4 top-2">Card Information</label>
                    <div className="w-full bg-white border border-gray-200 rounded-xl pt-7 pb-3 px-4 focus-within:ring-2 focus-within:ring-canteras-red transition-all">
                       <input required type="text" placeholder="4242 4242 4242 4242" className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase absolute left-4 top-2">MM / YY</label>
                       <input required type="text" placeholder="12 / 28" className="w-full bg-white border border-gray-200 rounded-xl pt-7 pb-3 px-4 focus:ring-2 focus:ring-canteras-red outline-none" />
                    </div>
                    <div className="relative flex-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase absolute left-4 top-2">CVC</label>
                       <input required type="text" placeholder="***" className="w-full bg-white border border-gray-200 rounded-xl pt-7 pb-3 px-4 focus:ring-2 focus:ring-canteras-red outline-none" />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {step === 'processing' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-canteras-gold/10 border-t-canteras-red rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 italic heading-font">Authorizing Transaction...</h3>
              </div>
            )}

            {step === 'success' && activeOrder && (
              <div className="animate-fade-in space-y-12 py-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border border-green-100">
                    {currentStatus === 'delivered' ? '🎁' : '🔥'}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 italic heading-font tracking-tight">
                    {currentStatus === 'preparing' && 'Kitchen is Fired Up!'}
                    {currentStatus === 'ready' && 'Order Ready for Pickup!'}
                    {currentStatus === 'delivered' && 'Enjoy Your Feast!'}
                  </h3>
                </div>
                
                {/* Visual Timeline */}
                <div className="px-4">
                  <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-canteras-red -translate-y-1/2 -z-10 transition-all duration-1000"
                      style={{ width: `${(getStatusIndex(currentStatus) / 2) * 100}%` }}
                    ></div>
                    
                    {[
                      { id: 'preparing', label: 'Preparing', icon: '🍳' },
                      { id: 'ready', label: 'Ready', icon: '✅' },
                      { id: 'delivered', label: 'Enjoy', icon: '🌮' }
                    ].map((s, idx) => {
                      const isActive = getStatusIndex(currentStatus) >= idx;
                      return (
                        <div key={s.id} className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${
                            isActive ? 'bg-canteras-red border-canteras-red text-white scale-110 shadow-lg' : 'bg-white border-gray-200 text-gray-300'
                          }`}>
                            {s.icon}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-canteras-red' : 'text-gray-300'}`}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-parchment p-8 rounded-[2.5rem] border-2 border-dashed border-canteras-gold/20 text-center">
                  {currentStatus === 'preparing' && (
                    <p className="text-gray-500 italic">"Our chefs are hand-pressing your tortillas as we speak."</p>
                  )}
                  {currentStatus === 'ready' && (
                    <p className="text-canteras-green font-bold">"Your order is hot and waiting at the counter!"</p>
                  )}
                  {currentStatus === 'delivered' && (
                    <p className="text-gray-900 font-black heading-font italic">"Buen Provecho! We hope to see you again soon."</p>
                  )}
                </div>

                {currentStatus !== 'delivered' && (
                  <div className="pt-4 space-y-4">
                    <button 
                      disabled={isRefunding}
                      onClick={handleRefundRequest}
                      className="w-full text-canteras-red font-bold hover:underline disabled:opacity-50 text-sm uppercase tracking-widest"
                    >
                      {isRefunding ? 'Cancelling...' : 'Cancel Order & Refund'}
                    </button>
                    <p className="text-center text-[9px] text-gray-400 uppercase tracking-tighter">
                      Automatic refund available for the next 5 minutes
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {step !== 'success' && step !== 'processing' && items.length > 0 && (
            <div className="p-6 bg-white border-t space-y-4 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
              {step === 'cart' ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-black text-gray-900 pt-1 italic heading-font border-t mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-canteras-red hover:bg-red-800 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-sm"
                  >
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handlePaymentSubmit}
                    className="w-full bg-canteras-green hover:bg-green-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-sm"
                  >
                    Authorize ${total.toFixed(2)}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
