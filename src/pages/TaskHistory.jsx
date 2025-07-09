import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaTrashAlt } from "react-icons/fa";

const fmt = iso => new Date(iso).toLocaleDateString('es-PE',{
  day:'2-digit', month:'long', year:'numeric',
  hour:'2-digit', minute:'2-digit', hour12:true
});

export default function TaskHistory(){
  const { id } = useParams();
  const nav    = useNavigate();
  const { user } = useContext(AuthContext);

  const [data,setData] = useState(null);
  const [msg ,setMsg ] = useState(null);

  useEffect(()=>{
    api.get(`/tasks/${id}/history`)
       .then(r=>setData(r.data))
       .catch(e=>setMsg(e.response?.data?.mensaje||'Error'));
  },[id]);

  const borrar = () =>{
    if(!window.confirm('¿Borrar tarea?')) return;
    api.delete(`/tasks/${id}`)
       .then(()=>nav(-1))
       .catch(e=>setMsg(e.response?.data?.mensaje||'Error'));
  };

  if(!data) return <p>Cargando…</p>;
  const { tarea, logs } = data;

  return (
    <div className='Container-task'>
      <h2 className='russo-one-regular'>{tarea.title}</h2>
      {user.rol==='admin' && <button onClick={borrar} className='primaryButton purpple' > Borrar task <FaTrashAlt /></button>}
      <div className='Container-months'><p>{tarea.description || '—'}</p></div>
      <hr/>

      {logs.length===0
        ? <div className='Container-months'><p>No hay historial.</p></div>
        : <div className='Container-months'> <ul>
            {logs.map(l=>(
              <li key={l._id}>
                {l.message?.trim() || `Estado: ${l.status}`}
                <span style={{float:'right'}}>{fmt(l.date)}</span>
              </li>
            ))}
          </ul> </div> }
      {msg && <p style={{color:'red'}}>{msg}</p>}
    </div>
  );
}