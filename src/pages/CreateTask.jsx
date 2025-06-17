import React, { useState } from 'react';
import api from '../services/api';

export default function CreateTemplate() {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/templates', { title, description })
       .then(() => { setMsg('Plantilla Creada correctamente'); setTitle(''); setDesc(''); })
       .catch(err => setMsg(err.response?.data?.mensaje || 'Error'));
  };

  return (
    <div className='Container-task'>
      <form onSubmit={handleSubmit} className='user-create-form'>
        <h2 className='russo-one-regular'>Crear plantilla de tarea</h2>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" required />
        <textarea value={description} onChange={e=>setDesc(e.target.value)} placeholder="Descripción" />
        <button className='primaryButton' type="submit">Guardar</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
    
  );
}