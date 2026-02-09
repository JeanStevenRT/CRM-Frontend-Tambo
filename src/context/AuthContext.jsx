import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Renovar token al refrescar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get('/auth/renew')
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
      })
      .catch(() => logout());
  }, []);

  // Login
  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    navigate('/');  
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
