import React from 'react';

import { Outlet } from 'react-router-dom';

import Container from '@/components/layout/Container/Container';
import Footer from '@/components/layout/Footer/Footer';
import Navbar from '@/components/layout/Navbar/Navbar';

const MainLayout: React.FC = () => (
  <div className="app-layout">
    <header className="header">
      <Container>
        <Navbar />
      </Container>
    </header>
    <main className="main-content">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
