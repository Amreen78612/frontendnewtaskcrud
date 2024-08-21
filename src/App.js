import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from "./component/Main";
import "./App.css";
import From from "./component/From";
import Update from "./component/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Login";

const { REACT_APP_API_ENDPOINT } = process.env;

function App() {
  const getDataToken = () => {
    const storedToken = localStorage.getItem('datatoken');
    try {
      return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Failed to parse datatoken:", error);
      return null;
    }
  };

  const [datatoken, setdatatoken] = useState(getDataToken);
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(!!token);

  useEffect(() => {
    setLoggedIn(!!datatoken);
  }, [datatoken]);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REACT_APP_API_ENDPOINT}/login`, { email, password });
      const datatokendata = response.data.users;
      setdatatoken(datatokendata);
      localStorage.setItem('datatoken', JSON.stringify(datatokendata));
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      return response; 
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
      alert("Login failed. Please try again.");

    }

    
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setdatatoken(null);
    localStorage.removeItem('datatoken');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<From />} />
            <Route path="/users" element={<Main />} />
            <Route path="/users/:userId" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;