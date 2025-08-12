import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Fish, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/api/friends';
import MessageChat from './MessageChat';  

interface Friend {
  id: number;
  friend_user_id: number;
  full_name: string;
  username: string;
  marine_character: string;
  points: number;
  status: string;
  last_seen: string;
}

const MyFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const currentUserId = Number(localStorage.getItem('user_id'));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get('friends/');
        setFriends(res.data);
      } catch {
        toast.error('Failed to fetch friends');
      }
    };
    fetchFriends();
  }, []);

  const getEmoji = (char: string) => {
    const map: { [key: string]: string } = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄',
    };
    return map[char] || '🐠';
  };

  const statusColor = (status: string) => {
    if (status === 'online') return 'bg-green-500';
    if (status === 'recently') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const statusText = (status: string) => {
    if (status === 'online') return 'Online';
    if (status === 'recently') return 'Recently Active';
    return 'Offline';
  };

  const filteredFriends = friends.filter(f =>
    f.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Users className="w-10 h-10 mr-4" /> My Friends <Fish className="w-10 h-10 ml-4" />
          </h1>
          <p className="text-white/80 text-lg">Connect with fellow ocean lovers</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button className="bg-cyan-600" onClick={() => (location.href = '/friend-requests')}>
            View Requests
          </Button>
          <Button className="bg-cyan-600" onClick={() => (location.href = '/send-request')}>
            Send Request
          </Button>
        </div>

        {/* Search bar */}
        <Card className="bg-white/20">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* No friends found */}
        {filteredFriends.length === 0 && (
          <Card className="bg-white/20">
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 mx-auto text-white/60 mb-4" />
              <p className="text-white/80">No matching friends found.</p>
            </CardContent>
          </Card>
        )}

        {/* Friends list */}
        {filteredFriends.map(friend => (
          <Card key={friend.id} className="bg-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                {/* Friend info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-cyan-600 text-white text-xl">
                        {getEmoji(friend.marine_character)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColor(friend.status)} rounded-full border-2 border-white`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white">{friend.full_name}</CardTitle>
                    <CardDescription className="text-white/70">@{friend.username}</CardDescription>
                    <div className="flex space-x-4 mt-2">
                      <span className="text-white font-medium">{friend.points} points</span>
                      <Badge className={`${statusColor(friend.status)} text-white`}>
                        {statusText(friend.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Chat button triggers MessageChat */}
                <MessageChat
                  friendId={friend.friend_user_id}
                  friendName={friend.full_name}
                  friendMarineCharacter={friend.marine_character}
                  currentUserId={currentUserId}
                  triggerElement={
                    <Button variant="ghost" className="text-white">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  }
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between text-sm text-white/70">
                <span>Marine Character: {friend.marine_character}</span>
                <span>Last seen: {friend.last_seen}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default MyFriends;