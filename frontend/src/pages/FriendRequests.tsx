import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/api/friends';
import { toast } from 'sonner';

const FriendRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get('/api/friend-requests/');
      setRequests(res.data);
    } catch (err) {
      toast.error('Failed to load friend requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const removeRequest = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleAccept = async (id: number) => {
    try {
      await axiosInstance.post(`/api/friend-requests/${id}/accept/`);
      toast.success('Friend request accepted');
      removeRequest(id); // Optimistically remove
    } catch {
      toast.error('Failed to accept');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axiosInstance.post(`/api/friend-requests/${id}/reject/`);
      toast.success('Friend request rejected');
      removeRequest(id); // Optimistically remove
    } catch {
      toast.error('Failed to reject');
    }
  };

  return (
    <Layout>
      <Card className="max-w-2xl mx-auto mt-10 bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Friend Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-white/80 text-center">No pending friend requests.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="flex justify-between items-center text-white bg-white/10 p-3 rounded-lg">
                <div>
                  <p className="font-medium">{req.from_user.full_name}</p>
                  <p className="text-sm text-white/70">@{req.from_user}</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" onClick={() => handleAccept(req.id)} className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button size="sm" onClick={() => handleReject(req.id)} className="bg-red-600 hover:bg-red-700">
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default FriendRequests;
