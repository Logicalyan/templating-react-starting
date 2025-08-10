import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LocationState {
  email?: string;
  token?: string;
}

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: initialEmail = '', token: initialToken = '' } = (location.state || {}) as LocationState;

  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await resetPassword(email, token, newPassword);
      setSuccessMsg('Password reset successfully. You can now login with your new password.');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

      {successMsg && (
        <div className="mb-4 text-green-600 text-center font-medium">{successMsg}</div>
      )}

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="token" className="block mb-1 font-medium">
          Reset Token
        </label>
        <Input
          id="token"
          type="text"
          placeholder="Reset token"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="newPassword" className="block mb-1 font-medium">
          New Password
        </label>
        <Input
          id="newPassword"
          type="password"
          placeholder="••••••••"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
};
