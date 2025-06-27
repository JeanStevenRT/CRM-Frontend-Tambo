import React, { useState, useEffect, useContext } from 'react';
import api  from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MONTHS = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre'
];

export default function CalendarAdmin() {
  const { user } = useContext(AuthContext);
  const [sel, setSel]   = useState({ y: new Date().getFullYear(), m: null }); // m 0-11
  const [tasks, setTasks] = useState([]);

  // carga tareas cuando hay mes seleccionado
  useEffect(() => {
    if (sel.m === null) return;
    api.get(`/tasks/month`, {
      params: { year: sel.y, month: sel.m + 1 }  // +1 porque backend espera 1-12
    })
    .then(r => setTasks(r.data))
    .catch(console.error);
  }, [sel]);

  // helper
  const fmt = iso =>
    new Date(iso).toLocaleDateString('es-PE',
      { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className='Container-task'>
      <h2 className='russo-one-regular'>Ver tareas en formato calendario</h2>

      {/* GRID 12 MESES */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,120px)',gap:24}}>
        {MONTHS.map((name,i) => (
          <div
            key={i}
            onClick={() => setSel({ ...sel, m: i })}
            style={{
              cursor:'pointer',
              border: sel.m===i ? '2px solid blue' : '1px solid gray',
              padding:6, textAlign:'center'
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* LISTA DEL MES */}
      {sel.m !== null && (
        <section style={{marginTop:32}}>
          <h3 style={{textTransform:'capitalize'}}>
            {MONTHS[sel.m]} {sel.y}
          </h3>

          {tasks.length === 0
            ? <p>No hay tareas este mes.</p>
            : <ul>
                {tasks.map(t => (
                  <li key={t._id}>
                    <Link to={`/calendar/task/${t._id}`}>{t.title}</Link> — {t.status}
                    <br/>
                    {t.description && <> {t.description}<br/></>}
                    Creada: {fmt(t.createdAt)}
                    {user.rol === 'admin' && t.assignedTo &&
                      <> — asignada a {t.assignedTo.username}</>}
                  </li>
                ))}
              </ul>}
        </section>
      )}
    </div>
  );
}