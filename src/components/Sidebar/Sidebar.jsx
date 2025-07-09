import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CiLogout } from "react-icons/ci";
import'../Sidebar/Sidebar.css';

export default function Sidebar() {
  const active = ({ isActive }) => isActive ? 'active' : undefined;
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <nav className="sidebar">
      <h2 className='russo-one-regular'>Tambo</h2>
      <ul>
        <li className='russo-one-regular'><NavLink to="/"  className={active} >Tareas asignadas</NavLink></li>
        {user?.rol === 'admin' && (
        <li><NavLink to="/create"  className={active}>crear tarea</NavLink></li>
        
        )}
        {user?.rol === 'admin' && (
        <>
        <li><NavLink to="/assigned-task-user"  className={active}>Asignar tarea a usuario</NavLink></li>
        <li><NavLink to="/calendar"  className={active}>administrar por calendario</NavLink></li>
         </>
        
        )}
        
        <li><NavLink to="/pending-admin"  className={active}>Administrar Tareas Pendientes</NavLink></li>
        <li><NavLink to="/in-review-admin" className={active}>Administrar Tareas En Revisión</NavLink></li>
        <li><NavLink to="/completed"  className={active}>Administrar Tareas completadas</NavLink></li>
         {user.rol === 'admin' && (
         <>
            <li><NavLink to="/user-create"  className={active}>Crear usuario</NavLink></li>
            <li><NavLink to="/users-list"  className={active}>Lista de usuarios</NavLink></li>
          </>
        )}
        
      </ul>
      <button className='secondaryButton' onClick={logout}> <CiLogout /> Cerrar sesión </button>
    </nav>
  );
}