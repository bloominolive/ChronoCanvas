import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import DualDateComparison from './pages/dual-date';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';
import Navbar from './components/navbar';


export default function App() {
  return (
    <Router>
      <div className="App app-background body">
        <Navbar />
        <div className='main pt-5 mt-1 mt-sm-5'>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/login" element={<LoginPage /> } />
            <Route path="/register" element={<RegisterPage /> } />
            <Route path="/compare" element={<DualDateComparison /> } />
          </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}


