import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Css-pages/CreateTask.css'

export default function CreateTask() {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus]= useState('pendiente');
  const [workers, setWorkers]       = useState([]);


  useEffect(() => {
    api
      .get('/auth/users?rol=trabajador') // ← backend debe exponer este endpoint
      .then(res => setWorkers(res.data)) // res.data: [{ _id, username, nombres, apellidos }, …]
      .catch(console.error);
  }, []);

  
  const handleSubmit = e => {
    e.preventDefault();
    api
      .post('/tasks', { title, description, assignedTo })
      .then(() => {
        setTitle('');
        setDescription('');
        setAssignedTo('');
      })
      .catch(console.error);
  };


  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h2 className='russo-one-regular'>Crear tarea</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        required
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descripción"
      />

      {/* Dropdown con los trabajadores */}
      <select
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        required
      >
        <option value="">-- Selecciona trabajador --</option>
        {workers.map(w => (
          <option key={w._id} value={w._id}>
            {w.username} ({w.nombres} {w.apellidos})
          </option>
        ))}
      </select>

      <select 
        value={status}
        onChange={e => setStatus(e.target.value)}
        required
      >
        <option value="pendiente">Pendiente</option>
        <option value="en_revision">En revisión</option>
        <option value="completado">Completado</option>

      </select>

      <button className='primaryButton' type="submit">Crear</button>
    </form>
  );
}