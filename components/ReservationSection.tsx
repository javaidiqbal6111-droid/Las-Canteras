
import React, { useState } from 'react';

const ReservationSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="reservations" className="py-24 relative">
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/mexican-floral-quilt.png')`,
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left: Info */}
          <div className="lg:w-1/3 bg-canteras-red text-white p-12">
            <h2 className="text-4xl font-bold mb-6 heading-font italic">Join Us Tonight</h2>
            <p className="mb-8 opacity-90 leading-relaxed font-light italic">
              Whether it's a birthday, anniversary, or just a Tuesday night craving, we'd love to host you.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px]">Call Us</h4>
                  <p className="opacity-80">+1 (555) CANTERAS</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px]">Location</h4>
                  <p className="opacity-80">123 Salsa Lane, Flavor City, TX</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white/10 rounded-xl border border-white/20">
              <h4 className="font-bold text-canteras-gold mb-2 uppercase tracking-widest text-xs">Happy Hour</h4>
              <p className="text-sm font-light italic">Tue - Fri: 4PM - 7PM</p>
              <p className="text-sm mt-1 font-bold text-canteras-gold">$6 Signature Margaritas</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-2/3 p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-2 heading-font italic">Reservation Received!</h3>
                <p className="text-gray-600">We've sent a confirmation email to your inbox. Nos vemos pronto!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-[0.2em] text-[10px]">Full Name</label>
                  <input required type="text" className="w-full border-b-2 border-gray-100 focus:border-canteras-red px-0 py-3 outline-none transition-all placeholder:text-gray-200" placeholder="Antonio Banderas" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-[0.2em] text-[10px]">Date</label>
                  <input required type="date" className="w-full border-b-2 border-gray-100 focus:border-canteras-red px-0 py-3 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-[0.2em] text-[10px]">Time</label>
                  <select required className="w-full border-b-2 border-gray-100 focus:border-canteras-red px-0 py-3 outline-none bg-transparent transition-all">
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-[0.2em] text-[10px]">Guests</label>
                  <input required type="number" min="1" max="20" defaultValue="2" className="w-full border-b-2 border-gray-100 focus:border-canteras-red px-0 py-3 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-[0.2em] text-[10px]">Email Address</label>
                  <input required type="email" className="w-full border-b-2 border-gray-100 focus:border-canteras-red px-0 py-3 outline-none transition-all placeholder:text-gray-200" placeholder="antonio@example.com" />
                </div>
                <div className="md:col-span-2 mt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-canteras-red hover:bg-red-800 text-white font-black py-5 rounded-2xl transition-all shadow-lg transform active:scale-95 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Confirming...</span>
                      </>
                    ) : 'Confirm Reservation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
