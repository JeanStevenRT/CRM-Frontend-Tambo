import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AssignTask() {
  const [templates, setTemplates]   = useState([]);
  const [workers, setWorkers]       = useState([]);
  const [form, setForm] = useState({
    templateId: '',
    assignedTo: '',
    status: 'pendiente'
  });
  const [msg, setMsg] = useState(null);

  /* cargar plantillas y trabajadores */
  useEffect(() => {
    api.get('/templates').then(r => setTemplates(r.data));
    api.get('/auth/users?rol=trabajador').then(r => setWorkers(r.data));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/tasks/assign', form)
       .then(() => { setMsg('✅ Tarea asignada'); setForm({ ...form, status:'pendiente' }); })
       .catch(err => setMsg(err.response?.data?.mensaje || 'Error'));
  };

  return (
    <div className='Container-task'>
      <form onSubmit={handleSubmit} className='user-create-form'>
        <h2 className='russo-one-regular'>Asignar tarea</h2>

        {/* plantilla */}
        <label>Seleccionar tarea</label>
        <select name="templateId" value={form.templateId} onChange={handleChange} required>
          <option value="">-- Elegir tarea --</option>
          {templates.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>

        {/* trabajador */}
        <label>Seleccionar usuario</label>
        <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required>
          <option value="">-- Elegir trabajador --</option>
          {workers.map(w => <option key={w._id} value={w._id}>{w.username}</option>)}
        </select>

        {/* estado */}
        <label>Estado de tarea</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="en_revision">En revisión</option>
          <option value="completado">Completado</option>
        </select>

        <button className='primaryButton'type="submit">Guardar</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
    
  );
}