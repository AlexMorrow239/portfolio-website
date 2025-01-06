import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/services/auth.service';

import AdminLayout from '../AdminLayout/AdminLayout';

const AdminLayoutWrapper: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    // Check authentication status on mount and redirect if not authenticated
    if (!isAuthenticated) {
      void navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <AdminLayout isAuthenticated={isAuthenticated} />;
};

export default AdminLayoutWrapper;
