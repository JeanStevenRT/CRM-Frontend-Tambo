import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/UserList.css'
import './Css-pages/UserCreate.css'

export default function UsersList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.rol === 'admin') {
      api.get('/auth/users/all')
         .then(res => setUsers(res.data))
         .catch(console.error);
    }
  }, [user]);

  if (user.rol !== 'admin') return <p>No autorizado</p>;

  return (
    <div className='Container-task'> 
      <h2 className='russo-one-regular'>Lista de usuarios</h2>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className='user-table'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Password (hash)</th>
              <th>Fecha creación</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.nombres}</td>
                <td>{u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td style={{ fontSize: '0.75em' }} className='hash-cell'>{u.password}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('es-PE')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}