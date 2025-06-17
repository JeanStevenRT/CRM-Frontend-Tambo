import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/AssignedTasks.css'
import './Css-pages/UserCreate.css'


export default function UserCreate() {

  const [form, setForm] = useState({
    username:  '',
    nombres:   '',
    apellidos: '',
    correo:    '',
    password:  '',
    rol:       'trabajador'
  });
  const [msg, setMsg] = useState(null);

  const { user } = useContext(AuthContext);
  if (user.rol !== 'admin') return <p>No autorizado</p>;
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/auth/registro', form)
       .then(() => {
         setMsg('Usuario creado');
         setForm({ ...form, username:'', nombres:'', apellidos:'', correo:'', password:'' });
       })
       .catch(err => setMsg(err.response?.data?.mensaje || 'Error'));
  };

  return (
    <div className='Container-task'>
      <form onSubmit={handleSubmit} className="user-create-form">
        <h2 className='russo-one-regular'>Crear usuario</h2>

        <input name="username"  value={form.username}  onChange={handleChange} placeholder="Username" required />
        <input name="nombres"   value={form.nombres}   onChange={handleChange} placeholder="Nombres"  required />
        <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellidos" required />
        <input name="correo"    value={form.correo}    onChange={handleChange} placeholder="Correo" type="email" required />
        <input name="password"  value={form.password}  onChange={handleChange} placeholder="Password" type="password" required />

        <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="trabajador">Trabajador</option>
            <option value="admin">Admin</option>
        </select>

        <button  className='primaryButton' type="submit">Crear usuario</button>

        {msg && <p>{msg}</p>}
        </form>  
    </div>
    
  );
}