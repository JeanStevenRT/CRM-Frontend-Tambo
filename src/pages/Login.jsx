import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import tamboLogo from '../assets/tambo-logo.png'; 
import './Css-pages/Login.css'
export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="Container-login">
      <img src={tamboLogo} alt="Tambo CRM" className="logo" />

      <form onSubmit={handleSubmit} className="login-form">
        <h1 className='russo-one-regular'>CRM Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button  className='primaryButton' type="submit">Login</button>
         <span className='account-demo'>Usuario demo: steven123, Contraseña: steven123</span>
        </form>
       
    </div>
  );
}
