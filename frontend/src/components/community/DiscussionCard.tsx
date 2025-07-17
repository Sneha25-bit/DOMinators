
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import UserProfileHoverCard from './UserProfileHoverCard';
import { formatDistanceToNow } from 'date-fns';

interface Discussion {
  id: number;
  author: {
    username: string;
    fullName: string;
    marineCharacter: string;
    points: number;
    status: 'online' | 'recently' | 'offline';
  };
  title: string;
  content: string;
  likes: number;
  liked_by_user: boolean;
  replies: number;
  timestamp: string;
  category: string;
}

interface DiscussionCardProps {
  discussion: Discussion;
  onLike: (id: number) => void;
  onAddFriend: (username: string) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, onLike, onAddFriend }) => {
  const isLiked = discussion.liked_by_user;

  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <UserProfileHoverCard author={discussion.author} onAddFriend={onAddFriend} />
            <div>
              <h3 className="text-white font-semibold">{discussion.author.fullName}</h3>
              <p className="text-white/70 text-sm">@{discussion.author.username}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-cyan-600/80 text-white mb-1">
              {discussion.category}
            </Badge>
            <p className="text-white/60 text-xs">
              {formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        <CardTitle className="text-white mt-4">{discussion.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/90 mb-4 leading-relaxed">{discussion.content}</p>
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(discussion.id)}
            className={`hover:bg-white/20 space-x-2 ${isLiked ? 'text-pink-400' : 'text-white'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-400' : ''}`} />
            <span>{discussion.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{discussion.replies}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;
