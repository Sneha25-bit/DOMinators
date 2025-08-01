
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/api/friends'; 

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  marineCharacter: string;
  joinDate: string;
  points: number;
  status: 'online' | 'offline' | 'recently';
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPoints: (points: number) => void;
  refreshUser: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);


  useEffect(() => {
    const savedUser = localStorage.getItem('oceanUser');
    const savedToken = localStorage.getItem('oceanToken');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedToken);
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('oceanUser', JSON.stringify(userData));
    localStorage.setItem('oceanToken', token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('oceanUser');
    localStorage.removeItem('oceanToken');
  };

  const updateUserPoints = async (points: number) => {
  if (!user) return;

  try {
    // POST request to your `UpdateUserPointsView` endpoint
    const res = await axiosInstance.post('/api/users/add-points/', {
      points,
    });

    // Backend responds with updated total points
    const updatedUser = { ...user, points: res.data.points };
    setUser(updatedUser);
    localStorage.setItem('oceanUser', JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Failed to update points:', error);
  }
};


  const refreshUser = async () => {
    try {
      const res = await axiosInstance.get('/api/users/me/'); 
      setUser(res.data);
      localStorage.setItem('oceanUser', JSON.stringify(res.data));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      login,
      logout,
      isAuthenticated: !!user,
      updateUserPoints,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};