// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { routesConfig } from './routesConfig';

interface RouteGuardProps {
  children: React.ReactNode;
  access?: 'public' | 'publicOnly' | 'private';
  roles?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, access = 'public', roles: requiredRoles }) => {
  const { token, roles: userRoles, isLoading } = useAuth();

  console.log('%c[RouteGuard Debug]', 'color: orange; font-weight: bold;');
  console.log('→ required roles:', requiredRoles);
  console.log('→ user roles:', userRoles);

  // 🚀 Wait until loading finishes to avoid false negatives
  if (isLoading || (access === 'private' && token && userRoles.length === 0)) {
    return <div>Loading...</div>;
  }

  if (access === 'private' && !token) {
    return <Navigate to="/login" replace />;
  }
  if (access === 'public' && token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles?.length) {
    const hasAccess = userRoles?.some(role => requiredRoles.includes(role));
    console.log('→ has role access?', hasAccess);
    if (!hasAccess) return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};





export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesConfig.map(({ path, component: Component, access, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteGuard access={access} roles={roles}>
                <Component />
              </RouteGuard>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
