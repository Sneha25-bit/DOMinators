
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Fish } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mock login - in real app, this would validate against a database
    const mockUser = {
      id: '1',
      fullName: 'Ocean Explorer',
      username: formData.username,
      email: 'user@ocean.com',
      phone: '+1234567890',
      marineCharacter: 'dolphin',
      joinDate: new Date().toISOString(),
      points: 0,
      status: 'online' as const
    };

    login(mockUser);
    toast.success('Welcome back to Ocean Explorer!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen ocean-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/5968a9fc-4957-4514-a427-0a9442a24e20.png')] bg-cover bg-center opacity-20"></div>
      
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-md border-white/30 relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-8 h-8 text-white mr-2" />
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <Fish className="w-8 h-8 text-white ml-2" />
          </div>
          <CardDescription className="text-white/80">
            Sign in to continue your ocean exploration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white ripple-effect">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white/80">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:underline font-medium">
                Join the community
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
