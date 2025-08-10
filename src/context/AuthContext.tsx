// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthResponseData } from '../types/user';
import { loginUser, logoutUser, registerUser, fetchUserProfile } from '../api/auth';
import axiosInstance from '../api/axiosInstance';

interface AuthContextType {
  user: User | null;
  roles: string[];
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    setUser(data.user);
    setRoles(data.roles);
    setToken(data.token || null);
    if (data.token) localStorage.setItem('token', data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    setUser(data.user);
    setRoles(data.roles);
    setToken(data.token || null);
    if (data.token) localStorage.setItem('token', data.token);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setRoles([]);
    setToken(null);
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const fetchProfile = async () => {
    const data = await fetchUserProfile();
    setUser(data.user);
    setRoles(data.roles);
  };

  return (
    <AuthContext.Provider value={{ user, roles, token, login, logout, register, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
