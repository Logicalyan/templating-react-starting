// src/pages/Home.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user?.name ?? 'User'}!</h1>
      <p className="mb-6 text-lg text-gray-700">
        This is your dashboard home page. You can customize it as you want.
      </p>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
