import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';

// Page imports
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />

    </>
  );
}

export default App;
