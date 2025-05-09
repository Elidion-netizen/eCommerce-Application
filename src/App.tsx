import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/ui/header';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegistrationPage';
// import AboutPage from './pages/AboutPage';
// import CatalogPage from './pages/CatalogPage';
// import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

function App(): React.JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/catalog" element={<CatalogPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
