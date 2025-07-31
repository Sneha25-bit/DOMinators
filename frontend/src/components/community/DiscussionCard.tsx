
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import UserProfileHoverCard from './UserProfileHoverCard';
import { formatDistanceToNow } from 'date-fns';
import { getComments, addComment } from '@/api/community';

interface Comment {
  id: number;
  user: {
    username: string;
    full_name: string;
  };
  content: string;
  created_at: string;
}

interface Discussion {
  id: number;
  author: {
    username: string;
    full_name: string;
    marine_character: string;
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
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments && comments.length === 0) {
      getComments(discussion.id)
        .then(res => setComments(res.data))
        .catch(err => console.error('Failed to fetch comments', err));
    }
  }, [showComments]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await addComment(discussion.id, newComment);
      setComments(prev => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <UserProfileHoverCard author={discussion.author} onAddFriend={onAddFriend} />
            <div>
              <h3 className="text-white font-semibold">{discussion.author.full_name}</h3>
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
            onClick={() => setShowComments(prev => !prev)}
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
        {showComments && (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="text-white/80 text-sm border-l-2 border-cyan-400 pl-3">
                <span className="font-semibold">@{comment.user.username}</span>: {comment.content}
                <div className="text-xs text-white/50 ml-2">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </div>
              </div>
            ))}

            {/* Add comment form */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow px-3 py-1 rounded bg-white/80 text-black text-sm"
              />
              <Button
                size="sm"
                onClick={handleSubmitComment}
                disabled={loading}
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;
