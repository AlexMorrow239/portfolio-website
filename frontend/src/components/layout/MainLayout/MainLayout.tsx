// src/components/layout/MainLayout/MainLayout.tsx
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import Container from "@/components/layout/Container/Container";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="header">
        <Container>
          <Navbar />
        </Container>
      </header>
      <main className="main-content">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
