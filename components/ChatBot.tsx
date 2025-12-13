import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hrmm... Welcome! I am the automated assistant. Ask me anything about the developer!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection lost to the Overworld..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-gray-800 border-4 border-gray-900 rounded-none shadow-xl flex flex-col font-['VT323'] text-lg animate-in fade-in slide-in-from-bottom-10 duration-200">
          {/* Header */}
          <div className="bg-purple-700 p-2 border-b-4 border-gray-900 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">BlockyBot v2.5</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-600 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 bg-[#c6c6c6] bg-opacity-10 backdrop-blur-sm space-y-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] p-2 border-2 shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 border-blue-800 text-white rounded-tr-none rounded-bl-xl rounded-tl-xl rounded-br-xl' 
                      : 'bg-stone-200 border-stone-400 text-black rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-xl'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-200 border-stone-400 text-gray-500 p-2 border-2 rounded-xl animate-pulse">
                  Hmm...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2 bg-gray-700 border-t-4 border-gray-900 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my skills..."
              className="flex-1 bg-gray-900 text-white border-2 border-gray-600 p-2 focus:outline-none focus:border-green-500 font-['VT323'] text-xl placeholder-gray-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className={`
                p-2 border-b-4 border-r-4 active:border-b-0 active:border-r-0 active:translate-x-1 active:translate-y-1 transition-all
                ${isLoading ? 'bg-gray-500 border-gray-700 cursor-not-allowed' : 'bg-green-600 border-green-800 hover:bg-green-500 text-white'}
              `}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-none border-b-4 border-r-4 border-green-800 shadow-lg active:mt-1 active:ml-1 active:border-b-0 active:border-r-0 transition-all duration-75 flex items-center gap-2 minecraft-shadow hover:-translate-y-1"
        >
          <Bot size={24} />
          <span className="font-['VT323'] text-xl hidden sm:inline">Ask AI</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;