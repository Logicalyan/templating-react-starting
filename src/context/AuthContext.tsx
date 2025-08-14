// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user';
import { loginUser, logoutUser, registerUser, fetchUserProfile } from '../api/auth';
import axiosInstance from '../lib/axiosInstance';

interface AuthContextType {
  user: User | null;
  roles: string[];
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {

      if (token) {
        try {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          fetchProfile();
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          setToken(null);
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false); // Set loading false setelah cek selesai
    };
    initializeAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const data = await loginUser(email, password);
    setUser(data.user);
    setRoles(data.roles);
    console.log('Login successful:', data);
    setToken(data.token || null);
    if (data.token) localStorage.setItem('token', data.token);
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    setUser(data.user);
    setRoles(data.roles);
    setToken(data.token || null);
    if (data.token) localStorage.setItem('token', data.token);
  };

  const logout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setRoles([]);
    setToken(null);
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setLoading(false);
  };

  const fetchProfile = async () => {
    const data = await fetchUserProfile();
    setUser(data.user);
    setRoles(data.roles);
  };

  return (
    <AuthContext.Provider value={{ user, roles, token, loading, login, logout, register, fetchProfile, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};