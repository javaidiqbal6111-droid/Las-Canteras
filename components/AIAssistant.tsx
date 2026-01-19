
// import React, { useState, useRef, useEffect } from 'react';
// import { getDishRecommendation } from '../services/geminiService';
// import { ChatMessage } from '../types';

// const AIAssistant: React.FC = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMsg: ChatMessage = { role: 'user', text: input };
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     const recommendation = await getDishRecommendation(input);
//     const modelMsg: ChatMessage = { role: 'model', text: recommendation };
    
//     setMessages(prev => [...prev, modelMsg]);
//     setIsLoading(false);
//   };

//   return (
//     <>
//       {/* Trigger Button */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-50 bg-canteras-green text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
//       >
//         <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">Chef Advisor</span>
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//         </svg>
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-fade-in">
//           {/* Header */}
//           <div className="bg-canteras-green text-white p-4 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">👨‍🍳</div>
//               <div>
//                 <h3 className="font-bold">Chef Sommelier</h3>
//                 <p className="text-xs opacity-80">AI Menu Expert</p>
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Messages */}
//           <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-parchment">
//             {messages.length === 0 && (
//               <div className="text-center text-gray-500 mt-10 p-6 italic">
//                 "Hola! I am the Chef Sommelier. Tell me what flavors you are in the mood for, and I'll find your perfect match."
//               </div>
//             )}
//             {messages.map((m, i) => (
//               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
//                   m.role === 'user' 
//                   ? 'bg-canteras-red text-white rounded-br-none' 
//                   : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-none'
//                 }`}>
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-100 p-3 rounded-2xl animate-pulse">
//                   The Chef is thinking...
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="p-4 bg-white border-t flex gap-2">
//             <input 
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Suggest something spicy..."
//               className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-canteras-green"
//             />
//             <button 
//               onClick={handleSend}
//               className="bg-canteras-green text-white p-2 rounded-full hover:bg-green-700 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AIAssistant;
