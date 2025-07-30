
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { User, Trophy, Heart, MessageSquare, Calendar, Fish } from 'lucide-react';
import { fetchUserDashboard } from '@/api/dashboard';
import { toast } from 'sonner';
import ProgressCard from '@/components/ProgressCard';

const UserDashboard = () => {
  const { accessToken } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchUserDashboard();
        setDashboard(data);
      } catch (error) {
        toast.error('Failed to load dashboard');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) loadDashboard();
  }, [accessToken]);

  if (!loading && !dashboard) {
    return <div className="text-red-500 text-center mt-10">Failed to load dashboard. Please try again later.</div>;
  }
  if (loading) return <div className="text-white text-center mt-10">Loading dashboard...</div>;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <User className="w-10 h-10 mr-4" />
            My Dashboard
          </h1>
        </div>

        {/* User Profile Card */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-cyan-600 text-white text-2xl">
                  {getCharacterEmoji(dashboard?.marine_character || 'dolphin')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-white text-2xl">{dashboard?.full_name}</CardTitle>
                <CardDescription className="text-white/70 text-lg">@{dashboard?.username}</CardDescription>
                <div className="flex items-center mt-2">
                  <Fish className="w-5 h-5 mr-2 text-cyan-400" />
                  <span className="text-white font-semibold">{dashboard?.points} Ocean Points</span>
                </div>
              </div>
              <Badge className="bg-cyan-600 text-white">
                {dashboard?.marine_character || 'Dolphin'} Lover
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{dashboard?.games_won}</p>
                <p className="text-white/70 text-sm">Games Won</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${dashboard?.total_donated}</p>
                <p className="text-white/70 text-sm">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{dashboard?.posts_made}</p>
                <p className="text-white/70 text-sm">Posts Made</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{dashboard?.friends}</p>
                <p className="text-white/70 text-sm">Friends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboard?.recent_activities?.map((activity: any) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'game' && <Trophy className="w-5 h-5 text-yellow-400" />}
                    {activity.type === 'donation' && <Heart className="w-5 h-5 text-red-400" />}
                    {activity.type === 'community' && <MessageSquare className="w-5 h-5 text-blue-400" />}
                    <div>
                      <p className="text-white font-medium">{activity.description}</p>
                      <p className="text-white/60 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <Badge className="bg-cyan-600 text-white">
                    +{activity.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboard?.achievements?.map((achievement: any, index: number) => (
                <div key={index} className={`p-3 rounded-lg ${achievement.earned ? 'bg-cyan-600/20' : 'bg-white/10'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${achievement.earned ? 'text-cyan-200' : 'text-white/60'}`}>
                        {achievement.name}
                      </p>
                      <p className={`text-sm ${achievement.earned ? 'text-cyan-300' : 'text-white/50'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned ? (
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-white/30 rounded"></div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <ProgressCard dashboard={dashboard}/>
      </div>
    </Layout>
  );
};

export default UserDashboard;