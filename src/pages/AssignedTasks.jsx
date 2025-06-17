import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/AssignedTasks.css'

export default function AssignedTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks]     = useState([]);
  const [draft, setDraft]     = useState({}); 

  const today = new Date().toISOString().slice(0, 10);

  // cargar solo pendientes de hoy
  useEffect(() => {
    api
      .get(`/tasks/date?date=${today}&status=pendiente`)
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, [today]);

  // lista visible según rol
  const visibles =
    user.rol === 'admin'
      ? tasks
      : tasks.filter(t => t.assignedTo && t.assignedTo._id === user._id);

  // manejar cambios en el select
  const handleSelect = (taskId, value) =>
    setDraft(prev => ({ ...prev, [taskId]: value }));

  // enviar solo los que cambiaron
  const handleUpdate = async () => {
    const cambios = Object.entries(draft); // [[id,'en_revision'], …]
    await Promise.all(
      cambios.map(([id, status]) =>
        api.patch(`/tasks/${id}/status`, { status })
      )
    );
    setDraft({});
    // recargar lista
    api
      .get(`/tasks/date?date=${today}&status=pendiente`)
      .then(res => setTasks(res.data))
      .catch(console.error);
  };
  return (
    <div className='Container-task'>
        <h2 className='russo-one-regular'>Tareas Pendientes: ( {user.nombres} )</h2>

      {visibles.length === 0 ? (
        <div className='Card-Task-Undefined'>
          <h3>No hay tareas pendientes para hoy.</h3>
        </div>
        
      ) : (
        <div className='Card-Task'>
          <div className='Task-Details'>
            {visibles.map(t => (
              <div className='Details' key={t._id}>
                <h3>{t.title} <select
                      value={draft[t._id] ?? t.status}
                      onChange={e => handleSelect(t._id, e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_revision">En revisión</option>
                        <option value="completado">Completado</option>
                    </select> </h3>
                <ul>
                  <li>Descripción: <span> {t.description || '—'}</span>  </li>
                  <li>Tarea Creada el: <span>{t.createdAtLocal} </span>  </li>
                  
                  <li>{user.rol === 'admin' && t.assignedTo && (
                  <>
                    Asignado a: <span>{t.assignedTo.nombres} {t.assignedTo.apellidos}</span> 
                  </>
                )}</li>
                  
                </ul>
                {Object.keys(draft).length > 0 && (
                  <button className='secondaryButton' onClick={handleUpdate}>Actualizar tareas</button>
                )}
                
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}