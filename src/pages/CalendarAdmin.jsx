import React, { useState, useEffect, useContext } from 'react';
import api  from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { CiCalendarDate } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";


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
      <div style={{display:'grid',gap:24}} className='Container-months'>
        {MONTHS.map((name,i) => (
          <div
           
            key={i}
            onClick={() => setSel({ ...sel, m: i })}
            style={{
              cursor:'pointer',
              border: sel.m===i ? '3.5px solid var(--tambo-secondary)' : '2px solid var(--tambo-main)',
              padding:6, textAlign:'center'
            }}
            className='Months'
          >
            <CiCalendarDate />
            {name}
          </div>
        ))}
      </div>

      {/* LISTA DEL MES */}
      {sel.m !== null && (
        <section style={{marginTop:32}} className='Container-months' >
          <h3 style={{textTransform:'uppercase'}} className='russo-one-regular'>
            {MONTHS[sel.m]} {sel.y}
          </h3>
          <hr />
          {tasks.length === 0
            ? <p>No hay tareas este mes.</p>
            : <ul>
                {tasks.map(t => (
                  <li key={t._id}>
                    <CiBookmarkCheck />
                    <div className='Content_info'>
                       <Link to={`/calendar/task/${t._id}`}>{t.title}</Link> — {t.status}
                      <br/>
                      {t.description && <> {t.description}<br/></>}
                     
                      Creada : {fmt(t.createdAt)} —
                       <span>
                      {user.rol === 'admin' && t.assignedTo &&
                        <> asignada a {t.assignedTo.nombres} {t.assignedTo.apellidos} ({t.assignedTo.username})</>}
                      </span>
                      
                    </div>
                   
                    
                  </li>
                  
                ))}<hr />
              </ul> }
        </section>
      )}
    </div>
  );
}