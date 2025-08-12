import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axiosInstance from '@/api/friends';

const SendFriendRequest = () => {
  const [username, setUsername] = useState('');

  const handleSendRequest = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    try {
      await axiosInstance.post('/api/friend-requests/', { to_username: username });
      toast.success(`Friend request sent to ${username}`);
      setUsername('');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to send request');
    }
  };

  return (
    <Layout>
      <Card className="max-w-md mx-auto mt-10 bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Send Friend Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-white bg-white/10 border-white/30 placeholder:text-white/60"
          />
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={handleSendRequest}>
            Send Request
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SendFriendRequest;