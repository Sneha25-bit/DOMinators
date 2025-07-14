
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Fish } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Nemo, your ocean guide! 🐠 How can I help you explore the marine world today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user' as const
    };

    setMessages(prev => [...prev, newMessage]);

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('fact') || lowerMessage.includes('learn')) {
      return "🐋 Here's a fun fact: The heart of a blue whale is as big as a small car! Would you like to know more ocean facts?";
    } else if (lowerMessage.includes('game')) {
      return "🎮 You can play Tic-Tac-Toe and Guess the Fish in our Games section! Both have ocean themes and you can earn points!";
    } else if (lowerMessage.includes('donate')) {
      return "🐢 Thank you for caring about marine life! Visit our donations page to support ocean conservation efforts.";
    } else if (lowerMessage.includes('friend')) {
      return "👫 You can make friends in our Community section! Add friends and see their conservation activities.";
    } else if (lowerMessage.includes('camera') || lowerMessage.includes('live')) {
      return "📹 Check out our Explore Ocean page for live underwater cameras from around the world!";
    } else {
      return "🌊 That's interesting! Feel free to explore different sections of Ocean Explorer. Need help finding something specific?";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center z-50 float-animation`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white/95 backdrop-blur-md border-white/30 shadow-xl z-50">
          <CardHeader className="bg-cyan-600 text-white rounded-t-lg flex flex-row items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Fish className="w-5 h-5" />
              <CardTitle className="text-sm">Nemo - Ocean Guide</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask about ocean facts..."
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
