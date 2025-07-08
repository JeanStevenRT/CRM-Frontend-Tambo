import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import'../Sidebar/Sidebar.css';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <nav className="sidebar">
      <h2 className='russo-one-regular'>Tambo</h2>
      <ul>
        <li className='russo-one-regular'><NavLink to="/">Tareas asignadas</NavLink></li>
        {user?.rol === 'admin' && (
        <li><NavLink to="/create">crear tarea</NavLink></li>
        
        )}
        {user?.rol === 'admin' && (
        <>
        <li><NavLink to="/assigned-task-user">Asignar tarea a usuario</NavLink></li>
        <li><NavLink to="/calendar">administrar por calendario</NavLink></li>
         </>
        
        )}
        <li><NavLink to="/completed">Tareas completadas</NavLink></li>
        <li><NavLink to="/pending-admin">Administrar Tareas Pendientes</NavLink></li>
        <li><NavLink to="/in-review-admin">Administrar Tareas En Revisión</NavLink></li>
         {user.rol === 'admin' && (
         <>
            <li><NavLink to="/user-create">Crear usuario</NavLink></li>
            <li><NavLink to="/users-list">Lista de usuarios</NavLink></li>
          </>
        )}
        
      </ul>
      <button className='secondaryButton' onClick={logout}>Cerrar sesión</button>
    </nav>
  );
}