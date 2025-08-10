import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../api/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ResetPasswordRequest: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await resetPasswordRequest(email);
      setMessage('Password reset code sent successfully. Please check your email.');
      // Optionally redirect to OTP verification page:
      navigate('/verify-otp', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Failed to send reset password code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

      {message && (
        <div className="mb-4 text-green-600 text-center font-medium">{message}</div>
      )}

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
      )}

      <div className="mb-6">
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

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Sending...' : 'Send Reset Code'}
      </Button>
    </form>
  );
};
