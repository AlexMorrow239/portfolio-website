import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AdminLayout.scss';
import AdminNavbar from '@/components/layout/AdminNavbar/AdminNavbar';
import Footer from '@/components/layout/Footer/Footer';

interface AdminLayoutProps {
  isAuthenticated: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
