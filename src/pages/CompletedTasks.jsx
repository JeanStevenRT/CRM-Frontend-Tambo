import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/AssignedTasks.css'

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

const fmtTime = iso =>
  new Date(iso).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

export default function CompletedTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const noHora = 'Sin hora registrada';

  useEffect(() => {
    api.get('/tasks/completed')
       .then(res => setTasks(res.data))
       .catch(console.error);
  }, []);

  return (
    <div className='Container-task'>
      <h2 className='russo-one-regular'>Tareas completadas ({user.rol})</h2>

      {tasks.length === 0 ? (
        <div className='Card-Task-Undefined'>
          <p>No hay tareas completadas.</p>
        </div>
      ) : (
        <div className='Card-Task'>
          <div className='Task-Details'>
              {tasks.map(t => (
              <div className='Details' key={t._id}>
                <h3>{t.title}</h3>
                <ul>
                  <li>Descripción: <span>{t.description || '—'}</span></li>
                  <li>Fecha de creación: <span>{fmtDate(t.createdAt)} {fmtTime(t.createdAt)}</span></li>
                  <li>Fecha de completado: <span>
                    {t.completedAt ? `${fmtDate(t.completedAt)} ${fmtTime(t.completedAt)}`: noHora} 
                    </span>
                  </li>
                  {user.rol === 'admin' && t.assignedTo && (
                  <li>Asignado a: <span>{t.assignedTo.username} ({t.assignedTo.nombres} {t.assignedTo.apellidos})</span> 
                  </li>
                )}
                  
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
}