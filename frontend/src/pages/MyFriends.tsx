import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import { Users, MessageCircle, Search, Fish, Send } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/api/friends';



const MyFriends = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [friends, setFriends] = useState<any[]>([]);

  // Load friends from backend
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get('/api/friends/');
        setFriends(res.data);
      } catch (err) {
        console.error('Failed to fetch friends:', err);
        toast.error('Unable to load friends');
      }
    };

    fetchFriends();
  }, []);

  const getCharacterEmoji = (character: string) => {
    const emojis: { [key: string]: string } = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄',
    };
    return emojis[character] || '🐠';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'recently': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'recently': return 'Recently Active';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (friendName: string) => {
    if (!messageText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success(`Message sent to ${friendName}!`);
    setMessageText('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Users className="w-10 h-10 mr-4" />
            My Friends
            <Fish className="w-10 h-10 ml-4" />
          </h1>
          <p className="text-white/80 text-lg">
            Connect with fellow ocean enthusiasts and marine life lovers
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => window.location.href = '/friend-requests'}
          >
            View Friend Requests
          </Button>
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => window.location.href = '/send-request'}
          >
            Send Friend Request
          </Button>
        </div>


        {/* Search */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-white">{friends.length}</p>
              <p className="text-white/70">Total Friends</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-white">{friends.filter(f => f.status === 'online').length}</p>
              <p className="text-white/70">Online Now</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-white">
                {friends.length > 0
                  ? Math.round(friends.reduce((sum, f) => sum + f.points, 0) / friends.length)
                  : 0}
              </p>
              <p className="text-white/70">Avg Points</p>
            </CardContent>
          </Card>
        </div>

        {/* Friends List */}
        <div className="space-y-4">
          {filteredFriends.map(friend => (
            <Card key={friend.id} className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-cyan-600 text-white text-xl">
                          {getCharacterEmoji(friend.marine_character)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white">{friend.full_name}</CardTitle>
                      <CardDescription className="text-white/70">@{friend.username}</CardDescription>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Fish className="w-4 h-4 mr-1 text-cyan-400" />
                          <span className="text-white font-medium">{friend.points} points</span>
                        </div>
                        <Badge className={`${getStatusColor(friend.status)} text-white`}>
                          {getStatusText(friend.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="bg-white/95 backdrop-blur-md">
                        <SheetHeader>
                          <SheetTitle className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-cyan-600 text-white">
                                {getCharacterEmoji(friend.marine_character)}
                              </AvatarFallback>
                            </Avatar>
                            Message {friend.full_name}
                          </SheetTitle>
                          <SheetDescription>Send a message to your ocean buddy!</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Message</label>
                            <textarea
                              placeholder="Type your message here..."
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              rows={4}
                              className="w-full p-3 border rounded-lg resize-none"
                            />
                          </div>
                          <Button
                            onClick={() => handleSendMessage(friend.full_name)}
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Marine Character: {friend.marine_character}</span>
                  <span>Last seen: {friend.last_seen}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredFriends.length === 0 && (
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 mx-auto text-white/60 mb-4" />
              <p className="text-white/80">No friends found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyFriends;
