import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';
import { AuthService } from '@/services/auth.service';

const AdminLayoutWrapper: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    // Check authentication status on mount and redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <AdminLayout isAuthenticated={isAuthenticated} />;
};

export default AdminLayoutWrapper;
