
import React, { useState } from 'react';
import RefundPolicyModal from './RefundPolicyModal';

const Footer: React.FC = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  return (
    <footer id="contact" className="bg-canteras-red text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="text-3xl font-bold italic heading-font text-canteras-gold">LAS CANTERAS</span>
            <p className="mt-6 text-gray-200 max-w-sm leading-relaxed">
              Bringing authentic Mexican flavors to your community since 1998. Every dish is a story of tradition, family, and passion for great food.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-canteras-gold transition-colors">FB</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-canteras-gold transition-colors">IG</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-canteras-gold transition-colors">TW</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-canteras-gold">Quick Links</h4>
            <ul className="space-y-4 text-gray-200">
              <li><a href="#home" className="hover:text-canteras-gold transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-canteras-gold transition-colors">Our Menu</a></li>
              <li><a href="#reservations" className="hover:text-canteras-gold transition-colors">Reservations</a></li>
              <li><button onClick={() => setIsPolicyOpen(true)} className="hover:text-canteras-gold transition-colors text-left">Refund Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-canteras-gold">Hours</h4>
            <ul className="space-y-4 text-gray-200">
              <li>Mon - Thu: 11am - 10pm</li>
              <li>Fri - Sat: 11am - 11pm</li>
              <li>Sunday: 10am - 9pm</li>
              <li>Brunch: Sat-Sun 10am - 2pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Las Canteras Mexican Grill. Handcrafted with Amigos.</p>
        </div>
      </div>
      
      <RefundPolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </footer>
  );
};

export default Footer;
