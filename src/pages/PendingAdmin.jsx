import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/AssignedTasks.css'

export default function PendingAdmin() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [draft, setDraft] = useState({});  // { taskId: nuevoStatus }

  // cargar TODAS pendientes (sin filtro de fecha)
  useEffect(() => {
    api.get('/tasks/pending')
       .then(res => setTasks(res.data))
       .catch(console.error);
  }, []);

  // select handler
  const handleSelect = (id, val) =>
    setDraft(prev => ({ ...prev, [id]: val }));

  // guardar cambios
  const handleUpdate = async () => {
    await Promise.all(
      Object.entries(draft).map(([id, status]) =>
        api.patch(`/tasks/${id}/status`, { status })
      )
    );
    setDraft({});
    // recargar lista
    api.get('/tasks/pending').then(res => setTasks(res.data));
  };

  return (
    <div className='Container-task'>
      <h2 className='russo-one-regular'>Administrar tareas pendientes ({user.rol})</h2>

      {tasks.length === 0 ? (
        <div className='Card-Task-Undefined'>
            <p>No hay tareas pendientes.</p>
        </div>
        
      ) : (
        <div className='Card-Task'>
          <div className='Task-Details'>
            {tasks.map(t => (
              <div className='Details' key={t._id}>
                <h3>{t.title}
                    <select
                        value={draft[t._id] ?? t.status}
                        onChange={e => handleSelect(t._id, e.target.value)}>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_revision">En revisión</option>
                        <option value="completado">Completado</option>
                    </select>
                </h3>
                <ul>
                    <li>Descripción: <span>{t.description || '—'}</span></li>
                    <li>Tarea Creada en:<span>{t.createdAtLocal}</span></li>
                    <li>Asignado a: <span>{t.assignedTo ?  `${t.assignedTo.username} (${t.assignedTo.nombres} ${t.assignedTo.apellidos})` : '—'}</span></li>
                </ul>
                {Object.keys(draft).length > 0 && (
                <button className='secondaryButton' onClick={handleUpdate}>Actualizar estado</button> )}
                 
              </div>
            ))}
          </div>

          
        </div>
      )}
    </div>
  );
}