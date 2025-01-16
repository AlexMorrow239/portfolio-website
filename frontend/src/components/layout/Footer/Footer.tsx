// src/components/layout/Footer/Footer.tsx
import React from 'react';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SOCIAL_LINKS } from '@/config';

import Container from '../Container/Container';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <div className="footer__social">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <p className="footer__copyright">© {currentYear} Alex Morrow. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
