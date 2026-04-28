'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_GREETING = "Hi! I'm your display case assistant. How can I help you today? I can help you choose the right display for your store, answer questions about our products, or connect you with our sales team.";

const QUICK_REPLIES = [
  'What size display do I need?',
  'Do you offer assembly?',
  'What about shipping costs?',
  'Talk to a human',
];

const KNOWLEDGE_BASE: { [key: string]: string } = {
  'size': 'For counter displays, we recommend 48" for most checkout areas. For floor displays, our 70" showcases offer maximum visibility. Consider your available space and the products you want to display.',
  'assembly': 'Yes! We offer professional assembly services. Most displays arrive partially assembled and final setup takes 15-30 minutes. Our assembly service handles everything for you.',
  'shipping': 'Shipping is calculated at checkout based on your location and order size. All orders ship via freight (LTL) for safe delivery. Standard shipping takes 7-14 business days.',
  'price': 'Our display cases range from $449 for counter displays to $899+ for floor standing showcases. We also offer bundle deals and wholesale pricing for bulk orders.',
  'warranty': 'All our displays come with a 2-year manufacturer warranty covering defects in materials and workmanship. Extended warranties are available for purchase.',
  'custom': 'Yes! We offer custom sizes, colors, mirror backs, and shelving configurations. For orders of 5+ units, we can create fully customized solutions.',
  'rgb': 'Our RGB displays feature 16 million color options, app/remote control, and energy-efficient LEDs. They can increase customer dwell time by up to 40%.',
  'lock': 'All displays include a plunger lock with 2 keys for secure retail use. This standard lock provides reliable security for your merchandise.',
  'human': 'I can connect you with our sales team! You can reach us at our contact page, or call us during business hours (Mon-Fri 9am-6pm EST).',
  'default': "I'd be happy to help! Could you tell me more about what you're looking for? I can assist with product recommendations, pricing, shipping, or connect you with our sales team.",
};

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function getResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return response;
    }
  }
  
  // Check for common questions
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to Master Display Cases. I'm here to help you find the perfect display solution. What questions do you have?";
  }
  
  if (lowerMessage.includes('smoke') || lowerMessage.includes('vape')) {
    return "Great question! For smoke and vape shops, I recommend our 48-inch counter displays with RGB lighting. They are perfect for showcasing vape products and e-liquids. We also offer secure locking systems for high-value items. Would you like to see our smoke shop collection?";
  }
  
  if (lowerMessage.includes('jewelry')) {
    return "For jewelry stores, our premium showcases with enhanced lighting are ideal. The 70-inch floor standing displays offer maximum visibility for your fine jewelry collection. We also offer low-iron ultra-clear glass options for the best presentation.";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with today?";
  }
  
  return KNOWLEDGE_BASE['default'];
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(text);
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-800' : 'bg-black hover:bg-gray-800'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Display Assistant</p>
                <p className="text-xs text-gray-400">Online • Usually responds instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {QUICK_REPLIES.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by AI • For complex questions, ask to talk to a human
            </p>
          </div>
        </div>
      )}
    </>
  );
}