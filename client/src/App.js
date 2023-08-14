import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Page imports
import Landing from './pages/Landing.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';

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
