import React, { useEffect, useState } from 'react';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { SOCIAL_LINKS } from '@/config';

import { useTheme } from '@hooks/useTheme';

import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    // { path: '/demos', label: 'Demos' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      url: SOCIAL_LINKS.github,
      icon: <FontAwesomeIcon icon={faGithub} size="lg" />,
      label: 'GitHub',
    },
    {
      url: SOCIAL_LINKS.linkedin,
      icon: <FontAwesomeIcon icon={faLinkedin} size="lg" />,
      label: 'LinkedIn',
    },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / scrollHeight) * 100;

      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <motion.div className="navbar__progress" style={{ scaleX: scrollProgress / 100 }} />

      <div className="navbar__container">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo">
          Alex Morrow
        </NavLink>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="navbar__actions">
          <div className="navbar__social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__social-link"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} data-icon="sun" /> : <Moon size={20} data-icon="moon" />}
          </button>

          {/* Mobile Toggle - Now only shows on mobile */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar__mobile"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="navbar__mobile-links">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="navbar__mobile-footer">
                <div className="navbar__mobile-socials">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navbar__social-link"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
