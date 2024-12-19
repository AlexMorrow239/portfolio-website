// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@components/layout/MainLayout/MainLayout";
import Home from "@pages/Home/Home";
import About from "@pages/About/About";
import Projects from "@pages/Projects/Projects";
import Contact from "@pages/Contact/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
