import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Css-pages/UserList.css';
import './Css-pages/UserCreate.css';

export default function UsersList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [msg,   setMsg]   = useState(null);

  /* Carga lista de usuarios*/
  useEffect(() => {
    if (user.rol === 'admin') {
      api.get('/auth/users/all')
         .then(r => setUsers(r.data))
         .catch(console.error);
    }
  }, [user]);

  /* borra usuario*/
  const handleDelete = id => {
    if (!window.confirm('¿Eliminar usuario definitivamente?')) return;
    api.delete(`/auth/users/${id}`)
       .then(() => setUsers(prev => prev.filter(u => u._id !== id)))
       .catch(err =>
         setMsg(err.response?.data?.mensaje || 'Error al borrar')
       );
  };

  
  if (user.rol !== 'admin') return <p>No autorizado</p>;

 
  return (
    <div className="Container-task">
      <h2 className="russo-one-regular">Lista de usuarios</h2>

      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Password&nbsp;(hash)</th>
              <th>Creado</th>
              <th></th> 
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
                <td className="hash-cell" style={{ fontSize: '0.75em' }}>
                  {u.password}
                </td>
                <td>
                  {new Date(u.createdAt).toLocaleDateString('es-PE')}
                </td>
                <td>
                  <button
                    className="dangerButton"
                    onClick={() => handleDelete(u._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
