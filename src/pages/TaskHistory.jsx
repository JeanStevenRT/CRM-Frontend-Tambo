// src/pages/TaskHistory.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('es-PE',
    { day:'2-digit', month:'long', year:'numeric',
      hour:'2-digit', minute:'2-digit', hour12:true });

export default function TaskHistory() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [msg , setMsg ] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}/history`)
       .then(r => setData(r.data))
       .catch(err => setMsg(err.response?.data?.mensaje || 'Error'));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('¿Borrar tarea definitivamente?')) return;
    api.delete(`/tasks/${id}`)
       .then(() => nav(-1))
       .catch(err => setMsg(err.response?.data?.mensaje || 'Error'));
  };

  if (!data) return <p>Cargando…</p>;
  const { tarea, logs } = data;

  return (
    <div className='Container-task'>
      <h2 className='russo-one-regular'>{tarea.title}</h2>
      {user.rol==='admin' && (
        <button onClick={handleDelete}>borrar task asignada</button>
      )}
      <p>{tarea.description || '—'}</p>
      <hr/>
      <ul>
        {logs.map(l => (
          <li key={l._id}>
            {l.message || `Estado cambiado a ${l.status}`}
            <span style={{float:'right'}}>{fmtDate(l.date)}</span>
          </li>
        ))}
      </ul>
      {msg && <p style={{color:'red'}}>{msg}</p>}
    </div>
  );
}
