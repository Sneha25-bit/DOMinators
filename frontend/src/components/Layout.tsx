
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home, Users, Gamepad2, Camera, User, LogOut, Heart, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/explore-ocean', icon: Camera, label: 'Explore Ocean' },
    {path: '/marine-ecosystem', icon: Camera, label: 'Marine Ecosystem'}
  ];

  const getCharacterEmoji = (character: string) => {
    const emojis: { [key: string]: string } = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄'
    };
    return emojis[character] || '🐠';
  };

  return (
    <div className="min-h-screen ocean-gradient">
      {/* Navigation Bar */}
      <nav className="bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/home" className="text-white font-bold text-xl flex items-center">
                🌊 Ocean Explorer
              </Link>
              <div className="hidden md:flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-white/30 text-white'
                        : 'text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-cyan-600 text-white">
                      {getCharacterEmoji(user?.marineCharacter || 'dolphin')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-md" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.fullName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      @{user?.username} • {user?.points} points
                    </p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-donations')}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>My Donations</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-friends')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>My Friends</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-md border-t border-white/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Ocean Explorer</h3>
              <p className="text-white/80 text-sm">
                Connecting ocean lovers worldwide for marine conservation and exploration.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link to="/explore-ocean" className="hover:text-white">Live Ocean Cams</Link></li>
                <li><Link to="/games" className="hover:text-white">Marine Games</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link to="/my-donations" className="hover:text-white">Donate</Link></li>
                <li><a href="/my-friends" className="hover:text-white">Conservation</a></li>
                <li><a href="/marine-mammals" className="hover:text-white">Research</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link to="/my-friends" className="hover:text-white">Friends</Link></li>
                <li><a href="/home" className="hover:text-white">News</a></li>
                <li><a href="/marine-ecosystem" className="hover:text-white">Ocean</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white/60 text-sm">
            © 2025 Ocean Explorer. All rights reserved. 🌊
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Layout;
