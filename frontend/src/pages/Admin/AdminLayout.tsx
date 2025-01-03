import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, LogOut } from 'lucide-react';
import './Admin.scss';

interface AdminLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ isAuthenticated, onLogout }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-nav__logo">Backend Admin</div>
        <ul className="admin-nav__menu">
          <li>
            <a href="/admin/projects">
              <FolderKanban size={20} />
              Projects
            </a>
          </li>
          <li>
            <button onClick={onLogout} className="button button--danger">
              <LogOut size={20} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
