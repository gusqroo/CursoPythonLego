import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, X } from 'lucide-react';
import { ChatMessage } from '../types';
import { getAiResponse } from '../services/geminiService';

export const AiTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "¡Hola! Soy Spike. ¡Puedo ayudarte con Python o con tu robot! 🤖" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const reply = await getAiResponse(userMsg, messages);
    
    setLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: reply || "Lo siento, no entendí eso." }]);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110'}`}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <Bot className="text-white w-8 h-8" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden z-40 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`} style={{height: '500px'}}>
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-white font-bold">Asistente Spike</h3>
            <p className="text-indigo-200 text-xs">Potenciado por Gemini AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Pregúntame lo que sea..."
            className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};