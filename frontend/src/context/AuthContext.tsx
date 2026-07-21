import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('fundraise_access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res: any = await api.get('/auth/me');
        if (res.success && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        localStorage.removeItem('fundraise_access_token');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email: string, pass: string) => {
    const res: any = await api.post('/auth/login', { email, password: pass });
    if (res.success && res.data) {
      localStorage.setItem('fundraise_access_token', res.data.accessToken);
      localStorage.setItem('fundraise_refresh_token', res.data.refreshToken);
      setUser(res.data.user);
    }
  };

  const register = async (name: string, email: string, pass: string, role: string = 'DONOR') => {
    const res: any = await api.post('/auth/register', { name, email, password: pass, role });
    if (res.success && res.data) {
      localStorage.setItem('fundraise_access_token', res.data.accessToken);
      localStorage.setItem('fundraise_refresh_token', res.data.refreshToken);
      setUser(res.data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem('fundraise_access_token');
    localStorage.removeItem('fundraise_refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
