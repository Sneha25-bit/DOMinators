
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import CommunityHeader from '@/components/community/CommunityHeader';
import CreatePostForm from '@/components/community/CreatePostForm';
import DiscussionCard from '@/components/community/DiscussionCard';
import { getDiscussions, createPost, likePost } from '@/api/community';
import { addUserPoints }  from '@/api/points';
import { logUserActivity } from '@/api/dashboard';

const logActivity = async (type: 'community', description: string, points: number) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

const CommunityPage = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    getDiscussions()
      .then(res => setDiscussions(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to load discussions');
      });
  }, [])

  const handleCreatePost = async () => {
  if (!newPost.title.trim() || !newPost.content.trim()) {
    toast.error('Please fill in both title and content');
    return;
  }

  try {
    const response = await createPost({
      title: newPost.title,
      content: newPost.content,
      category: 'Discussion'
    });

    const post = response.data;

    setDiscussions([post, ...discussions]);
    setNewPost({ title: '', content: '' });
    toast.success('Discussion posted successfully! +5 points earned');
    await addUserPoints(5);
    await logActivity('community', 'Posted Discussion', 5);
  } catch (error: any) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      toast.error('You must be logged in to post.');
    } else {
      toast.error('Failed to create post');
    }
  }
};

  const handleLike = async (id: number) => {
    try {
      const res = await likePost(id);
      const data = await res.data

      setDiscussions(prev => 
        prev.map(d => d.id === id ? { ...d, likes: data.likes, liked_by_user: data.liked } : d)
      );
      if (data.liked) {
      await addUserPoints(1); 
      toast.success('Liked! +1 point earned');
    } else {
      toast('Unliked');
    }
      
    } catch (err) {
      console.error(err);
      toast.error('Failed to like post');
    }
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
