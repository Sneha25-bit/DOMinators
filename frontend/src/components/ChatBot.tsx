import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Fish } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌊 Heyo! I’m Nemo — your slightly dramatic but data-loving fish 🐠. I only respond to one secret spell: 'predict sea level in 2050'. Just 5 words! If you say anything else... I'll kindly remind you to stick to the magic words. 🪄🙂",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user' as const,
    };

    setMessages((prev) => [...prev, newMessage]);

    const match = inputValue.toLowerCase().match(/predict sea level in (\d{4})/i);
    if (match) {
      const year = parseInt(match[1]);
      try {
        const res = await axios.post('http://localhost:8000/api/ocean-ai/predict/', {
          year: year,
        });

        const predicted = res.data.sea_level_mm;
        const botResponse = {
          id: messages.length + 2,
          text: `📈 Sea level in ${year} is expected to rise to ${predicted.toFixed(2)} mm above year 2000.`,
          sender: 'bot' as const,
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        const botError = {
          id: messages.length + 2,
          text: '❌ Sorry, I couldn’t fetch the sea level prediction. Please try again later.',
          sender: 'bot' as const,
        };
        setMessages((prev) => [...prev, botError]);
      }
    } else {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot' as const,
      };
      setMessages((prev) => [...prev, botResponse]);
    }

    setInputValue('');
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    const match = lowerMessage.match(/predict sea level in (\d{4})/);

    if (match) {
      return "Predicting sea level..."; 
    } else {
      return "🌊 Sorry, I can only help you predict sea levels. Try asking me: 'predict sea level in 2050'.";
    }
  };

  return (
    <>
      {/* Chat Open Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center z-50 float-animation`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-[32rem] max-h-[90vh] bg-white/95 backdrop-blur-md border-white/30 shadow-xl z-50 flex flex-col overflow-hidden">
          {/* Close Button */}
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 z-50 text-white bg-cyan-600 hover:bg-cyan-700 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </Button>

          <CardHeader className="bg-cyan-600 text-white rounded-t-lg flex items-center space-x-2 p-4">
            <Fish className="w-5 h-5" />
            <CardTitle className="text-sm">Nemo - Ocean Guide</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-0">
              {/* Scrollable Message Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '22rem' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Field */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask about sea level"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>

        </Card>
      )}
    </>
  );
};

export default ChatBot;
