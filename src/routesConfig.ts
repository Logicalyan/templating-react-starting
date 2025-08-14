// src/routesConfig.ts
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPasswordRequest from './pages/ResetPasswordRequest';
import VerifyOTP from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import DashboardIndex from './pages/dashboard/index';
import ProvincePage from './pages/provinces';

export type UserRole = 'admin' | 'manager' | 'user';

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  access?: 'public' | 'publicOnly' | 'private'; // default: public
  roles?: UserRole[];
}

export const routesConfig: AppRoute[] = [
  // Public only (guest) routes
  { path: '/login', component: Login, access: 'publicOnly' },
  { path: '/register', component: Register, access: 'publicOnly' },
  { path: '/reset-password-request', component: ResetPasswordRequest, access: 'publicOnly' },
  { path: '/verify-otp', component: VerifyOTP, access: 'publicOnly' },
  { path: '/reset-password', component: ResetPassword, access: 'publicOnly' },

  // Private routes
  { path: '/', component: Home, access: 'private' },
  { path: '/dashboard', component: DashboardIndex, access: 'private', roles: ['admin'] },
  { path: '/province', component: ProvincePage, access: 'private', roles: ['admin'] },
];
