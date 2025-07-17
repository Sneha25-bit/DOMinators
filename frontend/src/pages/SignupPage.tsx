
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Fish } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { registerUser } from '@/lib/authApi';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    marineCharacter: ''
  });

  const marineCharacters = [
    { value: 'dolphin', label: '🐬 Dolphin', description: 'Intelligent and playful' },
    { value: 'turtle', label: '🐢 Sea Turtle', description: 'Wise and steady' },
    { value: 'whale', label: '🐋 Whale', description: 'Gentle giant' },
    { value: 'octopus', label: '🐙 Octopus', description: 'Creative and adaptable' },
    { value: 'shark', label: '🦈 Shark', description: 'Bold and fearless' },
    { value: 'seahorse', label: '🦄 Seahorse', description: 'Unique and magical' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.username || !formData.email || !formData.phone || !formData.password || !formData.marineCharacter) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
    full_name: formData.fullName,
    username: formData.username,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    marine_character: formData.marineCharacter,
  };

  try {
    const response = await registerUser(payload);
    toast.success('Account created! Welcome aboard 🐬');
    navigate('/login'); // or login user directly
  } catch (error: any) {
    const msg = error?.response?.data?.detail || 'Registration failed';
    toast.error(msg);
  }
  };

  return (
    <div className="min-h-screen ocean-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/5968a9fc-4957-4514-a427-0a9442a24e20.png')] bg-cover bg-center opacity-20"></div>
      
      <Card className="w-full max-w-lg bg-white/20 backdrop-blur-md border-white/30 relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-8 h-8 text-white mr-2" />
            <CardTitle className="text-2xl text-white">Join Ocean Explorer</CardTitle>
            <Fish className="w-8 h-8 text-white ml-2" />
          </div>
          <CardDescription className="text-white/80">
            Create your account and start exploring the ocean
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Choose Your Marine Character</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, marineCharacter: value }))}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your marine spirit" />
                </SelectTrigger>
                <SelectContent>
                  {marineCharacters.map((character) => (
                    <SelectItem key={character.value} value={character.value}>
                      <div className="flex items-center space-x-2">
                        <span>{character.label}</span>
                        <span className="text-sm text-muted-foreground">- {character.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white ripple-effect">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
