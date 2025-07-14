
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface CreatePostFormProps {
  newPost: { title: string; content: string };
  onPostChange: (post: { title: string; content: string }) => void;
  onCreatePost: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ newPost, onPostChange, onCreatePost }) => {
  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Start a New Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="What's your discussion title?"
          value={newPost.title}
          onChange={(e) => onPostChange({ ...newPost, title: e.target.value })}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
        />
        <Textarea
          placeholder="Share your ocean experience, ask questions, or start a conversation..."
          rows={4}
          value={newPost.content}
          onChange={(e) => onPostChange({ ...newPost, content: e.target.value })}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
        />
        <Button 
          onClick={onCreatePost}
          className="bg-cyan-600 hover:bg-cyan-700 text-white ripple-effect"
        >
          Post Discussion
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
