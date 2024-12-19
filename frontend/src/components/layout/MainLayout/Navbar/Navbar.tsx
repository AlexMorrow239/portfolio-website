// src/components/layout/Navbar/Navbar.tsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faXmark,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

interface NavItem {
  path: string;
  label: string;
}

interface SocialLink {
  url: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

const socialLinks: SocialLink[] = [
  {
    url: import.meta.env.VITE_GITHUB_URL || "#",
    icon: <FontAwesomeIcon icon={faGithub} size="lg" />,
    label: "GitHub",
  },
  {
    url: import.meta.env.VITE_LINKEDIN_URL || "#",
    icon: <FontAwesomeIcon icon={faLinkedin} size="lg" />,
    label: "LinkedIn",
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Handle navbar background
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        isDarkMode ? "navbar--dark" : ""
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="navbar__progress"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          Your Name
        </NavLink>

        {/* Desktop Navigation */}
        <div className="navbar__desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          {/* Social Links */}
          <div className="navbar__socials">
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

          {/* Theme Toggle */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`navbar__mobile-button ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar__mobile"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="navbar__mobile-links">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `navbar__mobile-link ${
                        isActive ? "navbar__mobile-link--active" : ""
                      }`
                    }
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
