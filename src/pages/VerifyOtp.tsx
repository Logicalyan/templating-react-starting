import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP } from '../api/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VerificationResult {
  email: string;
  token: string;
}

export const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get prefilled email from location.state, default to empty string if none
  const prefilledEmail = (location.state as { email?: string })?.email ?? '';

  // Initialize email state with prefilledEmail
  const [email, setEmail] = useState(prefilledEmail);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result: VerificationResult = await verifyOTP(email, Number(code));
      // Redirect to reset password page with email + token
      navigate('/reset-password', { state: { email: result.email, token: result.token } });
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h2>

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
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

      <div className="mb-6">
        <label htmlFor="code" className="block mb-1 font-medium">OTP Code</label>
        <Input
          id="code"
          type="text"
          placeholder="6-digit code"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          disabled={loading}
          maxLength={6}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  );
};
