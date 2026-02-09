import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoCloseSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import'../Sidebar/Sidebar.css';

export default function Sidebar({ isOpen , onClose}) {
  const active = ({ isActive }) => isActive ? 'active' : undefined;
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <header className={`header`} >
      <div className='sidebarHeader'>
        <h2 className='russo-one-regular'>Tambo</h2>
      </div>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="closeBtn" onClick={onClose} aria-label="Cerrar menú">
         <IoCloseSharp />
        </button>
        <ul>
          <li className='russo-one-regular'><NavLink to="/"  className={active} onClick={onClose} >Tareas asignadas</NavLink></li>
          {user?.rol === 'admin' && (
          <li><NavLink to="/create"  className={active} onClick={onClose} >crear tarea</NavLink></li>
          
          )}
          {user?.rol === 'admin' && (
          <>
          <li><NavLink to="/assigned-task-user"  className={active} onClick={onClose}>Asignar tarea a usuario</NavLink></li>
          <li><NavLink to="/calendar"  className={active} onClick={onClose}>administrar por calendario</NavLink></li>
          </>
          
          )}
          
          <li><NavLink to="/pending-admin"  className={active} onClick={onClose}>Administrar Tareas Pendientes</NavLink></li>
          <li><NavLink to="/in-review-admin" className={active}onClick={onClose}>Administrar Tareas En Revisión</NavLink></li>
          <li><NavLink to="/completed"  className={active} onClick={onClose}>Administrar Tareas completadas</NavLink></li>
          {user?.rol === 'admin' && (
          <>
              <li><NavLink to="/user-create"  className={active} onClick={onClose}>Crear usuario</NavLink></li>
              <li><NavLink to="/users-list"  className={active} onClick={onClose}>Lista de usuarios</NavLink></li>
            </>
          )}
          
        </ul>
        <button className='secondaryButton' onClick={logout} > <CiLogout /> Cerrar sesión </button>
      </nav> 
    </header>

  );
}