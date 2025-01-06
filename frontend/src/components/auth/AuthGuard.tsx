import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { AuthService } from '@/services/auth.service';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = (): void => {
      const isAuthenticated = AuthService.isAuthenticated();
      const isLoginPage = location.pathname === '/admin/login';

      if (!isAuthenticated && !isLoginPage) {
        // Redirect to login if not authenticated and not on login page
        void navigate('/admin/login', {
          replace: true,
          state: { from: location.pathname },
        });
      } else if (isAuthenticated && isLoginPage) {
        // Redirect to admin dashboard if authenticated and on login page
        void navigate('/admin/projects', { replace: true });
      }
    };

    void checkAuth();
  }, [navigate, location]);

  return <>{children}</>;
};
