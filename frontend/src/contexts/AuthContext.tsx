
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (userData: User, token:string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPoints: (points: number) => void;
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

  const login = (userData: User, token:string) => {
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

  const updateUserPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      localStorage.setItem('oceanUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      login,
      logout,
      isAuthenticated: !!user,
      updateUserPoints
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
