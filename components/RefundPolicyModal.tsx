
import React from 'react';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
        <div className="bg-canteras-red p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold heading-font uppercase tracking-widest">Refund & Cancellation Policy</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto font-light text-gray-700 leading-relaxed">
          <section>
            <h3 className="text-lg font-bold text-canteras-red uppercase mb-2">1. Cancellation Window</h3>
            <p>Orders can be cancelled with a full refund within 5 minutes of placement, provided the kitchen has not yet begun preparation of your meal.</p>
          </section>
          <section>
            <h3 className="text-lg font-bold text-canteras-red uppercase mb-2">2. Refund Processing</h3>
            <p>Approved refunds are processed immediately and typically appear on your statement within 3-5 business days depending on your financial institution.</p>
          </section>
          <section>
            <h3 className="text-lg font-bold text-canteras-red uppercase mb-2">3. Quality Assurance</h3>
            <p>If you are unsatisfied with the quality of your meal, please contact us immediately. We pride ourselves on authentic flavors and will provide a replacement or store credit upon verification.</p>
          </section>
          <section>
            <h3 className="text-lg font-bold text-canteras-red uppercase mb-2">4. Digital Payments</h3>
            <p>All transactions processed through our Stripe integration are encrypted. Refund totals include sales tax but exclude any third-party delivery fees if applicable.</p>
          </section>
        </div>
        <div className="p-6 border-t bg-parchment flex justify-end">
          <button onClick={onClose} className="bg-canteras-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-colors">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyModal;
