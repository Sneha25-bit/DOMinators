
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import CommunityHeader from '@/components/community/CommunityHeader';
import CreatePostForm from '@/components/community/CreatePostForm';
import DiscussionCard from '@/components/community/DiscussionCard';

const CommunityPage = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: {
        username: 'oceanlover23',
        fullName: 'Marina Santos',
        marineCharacter: 'turtle',
        points: 1250,
        status: 'online' as const
      },
      title: 'Amazing whale watching experience!',
      content: 'Just got back from a whale watching trip in Iceland. Saw 5 humpback whales! The way they moved through the water was absolutely mesmerizing. Has anyone else been whale watching recently?',
      likes: 24,
      replies: 8,
      timestamp: '2 hours ago',
      category: 'Experiences'
    },
    {
      id: 2,
      author: {
        username: 'coralkeeper',
        fullName: 'David Kim',
        marineCharacter: 'octopus',
        points: 890,
        status: 'recently' as const
      },
      title: 'Coral restoration project update',
      content: 'Our local coral restoration project has been amazing! We planted 200+ coral fragments this month. The growth rate is incredible. Looking for more volunteers!',
      likes: 31,
      replies: 12,
      timestamp: '5 hours ago',
      category: 'Conservation'
    },
    {
      id: 3,
      author: {
        username: 'deepseadiver',
        fullName: 'Sarah Ocean',
        marineCharacter: 'shark',
        points: 2100,
        status: 'offline' as const
      },
      title: 'Bioluminescent plankton photography tips',
      content: 'Captured some stunning bioluminescent plankton photos last night! Here are my top tips: 1) Use long exposure, 2) Minimal light pollution, 3) Be patient. What are your photography tips?',
      likes: 45,
      replies: 15,
      timestamp: '1 day ago',
      category: 'Photography'
    }
  ]);

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    const post = {
      id: discussions.length + 1,
      author: {
        username: user?.username || 'you',
        fullName: user?.fullName || 'You',
        marineCharacter: user?.marineCharacter || 'dolphin',
        points: user?.points || 0,
        status: 'online' as const
      },
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: 0,
      timestamp: 'just now',
      category: 'Discussion'
    };

    setDiscussions([post, ...discussions]);
    setNewPost({ title: '', content: '' });
    toast.success('Discussion posted successfully!');
  };

  const handleLike = (id: number) => {
    setDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === id 
          ? { ...discussion, likes: discussion.likes + 1 }
          : discussion
      )
    );
    toast.success('Liked! +1 point earned');
  };

  const handleAddFriend = (username: string) => {
    toast.success(`Friend request sent to ${username}!`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <CommunityHeader />
        <CreatePostForm 
          newPost={newPost}
          onPostChange={setNewPost}
          onCreatePost={handleCreatePost}
        />
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              onLike={handleLike}
              onAddFriend={handleAddFriend}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPage;
