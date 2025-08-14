// src/routesConfig.ts
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPasswordRequest from './pages/ResetPasswordRequest';
import VerifyOTP from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import DashboardIndex from './pages/dashboard/index';
import ProvincePage from './pages/provinces';
import DashboardPage from './pages/dashboard';

export type UserRole = 'admin' | 'manager' | 'user';

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  access?: 'public' | 'private'; // default: public
  roles?: UserRole[];
}

export const routesConfig: AppRoute[] = [
  // Public only (guest) routes
  { path: '/login', component: Login, access: 'public' },
  { path: '/register', component: Register, access: 'public' },
  { path: '/reset-password-request', component: ResetPasswordRequest, access: 'public' },
  { path: '/verify-otp', component: VerifyOTP, access: 'public' },
  { path: '/reset-password', component: ResetPassword, access: 'public' },

  // Private routes
  { path: '/', component: Home, access: 'private' },
  { path: '/dashboard', component: DashboardIndex, access: 'private', roles: ['admin'] },
  { path: '/dashboard/user', component: DashboardPage, access: 'private', roles: ['user'] },
  { path: '/province', component: ProvincePage, access: 'private', roles: ['admin'] },
];
