import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ValidationError {
  field: string;
  message: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError(null);
    setValidationErrors([]);

    try {
      await login(email, password);
      navigate('/'); // redirect to home after login success
    } catch (error: any) {
      setLoading(false);
      if (error.response?.data?.errors) {
        // Laravel validation errors
        setValidationErrors(error.response.data.errors);
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      {generalError && (
        <div className="mb-4 text-red-600 text-center font-medium">{generalError}</div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-invalid={validationErrors.some(e => e.field === 'email')}
          aria-describedby="email-error"
        />
        {validationErrors
          .filter(e => e.field === 'email')
          .map((err, i) => (
            <p key={i} id="email-error" className="text-red-600 text-sm mt-1">
              {err.message}
            </p>
          ))}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          aria-invalid={validationErrors.some(e => e.field === 'password')}
          aria-describedby="password-error"
        />
        {validationErrors
          .filter(e => e.field === 'password')
          .map((err, i) => (
            <p key={i} id="password-error" className="text-red-600 text-sm mt-1">
              {err.message}
            </p>
          ))}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
