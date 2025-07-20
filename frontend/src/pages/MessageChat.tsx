import React, { useState, useEffect } from 'react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/api/friends';

interface Message {
  sender: number;
  sender_username: string;
  content: string;
}

interface MessageChatProps {
  friendId: number;
  friendName: string;
  friendMarineCharacter: string;
  triggerElement: React.ReactNode;
  currentUserId: number;
}

const MessageChat: React.FC<MessageChatProps> = ({
  friendId,
  friendName,
  friendMarineCharacter,
  triggerElement,
  currentUserId,
}) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('friendId:', friendId, 'currentUserId:', currentUserId); // ✅ Debug: Check IDs
  }, [friendId, currentUserId]);

  const getEmoji = (char: string) => {
    const map: Record<string, string> = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄',
    };
    return map[char] || '🐠';
  };

  const loadMessages = async () => {
    try {
      const res = await axiosInstance.get(`/api/messages/?friend_id=${friendId}`);
      setMessages(res.data);
    } catch {
      toast.error('Failed to load messages');
    }
  };

  useEffect(() => {
    if (open) {
      loadMessages();
      setInput('');
    }
  }, [open, friendId]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error('Enter a message');
      return;
    }

    try {
      await axiosInstance.post('/api/messages/', {
        recipient: friendId,
        content: trimmed,
      });

      // Optimistically add the message locally
      setMessages(prev => [
        ...prev,
        {
          sender: currentUserId,
          sender_username: 'You',
          content: trimmed,
        },
      ]);

      setInput('');
      toast.success(`Message sent to ${friendName}`);
    } catch {
      toast.error('Failed to send message');
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {triggerElement}
      </SheetTrigger>

      <SheetContent className="bg-white/95">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-cyan-600 text-white">
                {getEmoji(friendMarineCharacter)}
              </AvatarFallback>
            </Avatar>
            Message {friendName}
          </SheetTitle>
          <SheetDescription>Chat with your friend</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="max-h-48 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <p
                key={idx}
                className={`px-4 py-2 rounded-lg text-sm ${
                  msg.sender === currentUserId
                    ? 'bg-cyan-100 text-right'
                    : 'bg-gray-200 text-left'
                }`}
              >
                <strong>{msg.sender_username || (msg.sender === currentUserId ? 'You' : '')}:</strong> {msg.content}
              </p>
            ))}
          </div>

          <textarea
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-lg"
          />

          <Button onClick={sendMessage} className="w-full bg-cyan-600">
            <Send className="w-4 h-4 mr-2" /> Send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MessageChat;
