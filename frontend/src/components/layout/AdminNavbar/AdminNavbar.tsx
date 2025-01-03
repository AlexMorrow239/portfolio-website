import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, LogOut, Home } from 'lucide-react';
import { AuthService } from '@/services/auth.service';
import './AdminNavbar.scss';

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / scrollHeight) * 100;

      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/admin/login', { replace: true });
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <nav className={`admin-navbar ${scrolled ? 'admin-navbar--scrolled' : ''}`}>
      <motion.div className="admin-navbar__progress" style={{ scaleX: scrollProgress / 100 }} />

      <div className="admin-navbar__container">
        <NavLink to="/admin" className="admin-navbar__logo">
          Admin Dashboard
        </NavLink>

        <div className="admin-navbar__nav">
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `admin-navbar__link ${isActive ? 'admin-navbar__link--active' : ''}`
            }
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>
        </div>

        <div className="admin-navbar__actions">
          <button
            onClick={handleBackToMain}
            className="admin-navbar__link admin-navbar__link--website"
          >
            <Home size={20} />
            Back to Website
          </button>

          <button onClick={handleLogout} className="admin-navbar__logout">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
