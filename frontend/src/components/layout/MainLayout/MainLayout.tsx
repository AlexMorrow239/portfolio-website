// src/components/layout/MainLayout/MainLayout.tsx
import React from "react";
// import { Outlet } from 'react-router-dom';
import Navbar from "@components/layout/MainLayout/Navbar/Navbar";
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">{children}</main>
      {/* Footer will go here */}
    </div>
  );
};

export default MainLayout;
