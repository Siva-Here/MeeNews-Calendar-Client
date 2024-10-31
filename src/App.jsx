import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Statistics from './components/Home/Statistics';
import Layout from './components/Add Ad/Layout';
import Preview from './components/Preview/Preview';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="app-container flex">
        {isAuthenticated && <Navbar />}
        <div className="content flex-1">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
            <Route path="/preview" element={isAuthenticated ? <Preview /> : <Navigate to="/login" />} />
            <Route path="/add" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="my-toast-container" 
      />
    </Router>
  );
}

export default App;
