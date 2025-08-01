
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Fish, UserPlus } from 'lucide-react';

interface UserProfileHoverCardProps {
  author: {
    username: string;
    full_name: string;
    marine_character: string;
    points: number;
    status: 'online' | 'recently' | 'offline';
  };
  onAddFriend: (username: string) => void;
}

const UserProfileHoverCard: React.FC<UserProfileHoverCardProps> = ({ author, onAddFriend }) => {
  const getCharacterEmoji = (character: string) => {
    const emojis: { [key: string]: string } = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄'
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

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative cursor-pointer">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-cyan-600 text-white text-lg">
              {getCharacterEmoji(author.marine_character)}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(author.status)} rounded-full border-2 border-white`}></div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/90 backdrop-blur-md">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{author.full_name}</h4>
            <p className="text-sm text-muted-foreground">@{author.username}</p>
            <div className="flex items-center pt-2">
              <Fish className="w-4 h-4 mr-2 text-cyan-600" />
              <span className="text-xs text-muted-foreground">
                {author.points} Ocean Points
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 ${getStatusColor(author.status)} rounded-full mr-2`}></div>
              <span className="text-xs text-muted-foreground capitalize">
                {author.status}
              </span>
            </div>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-cyan-600 text-white text-lg">
              {getCharacterEmoji(author.marine_character)}
            </AvatarFallback>
          </Avatar>
        </div>
        <Button 
          size="sm" 
          className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700"
          onClick={() => onAddFriend(author.username)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friend
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfileHoverCard;
