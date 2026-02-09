
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { TiThMenu } from "react-icons/ti";
import'../Dashboard/DashboardLayout.css';
import { useState } from 'react';

export default function DashboardLayout() {
  const [menuOpen , setMenuOpen] = useState(false);
  

  return (
    <div className="dashboard">
      <button className='menuBtn' onClick={()=>setMenuOpen(true)}  aria-label="Abrir menú">
        <TiThMenu />
      </button>
      { menuOpen && (<div className={`overlay ${menuOpen? "show":"" }`}  onClick={() => setMenuOpen(false)}/> ) }
      <Sidebar isOpen={menuOpen} onClose={()=> setMenuOpen(false) } />
      <main>
        <Outlet />
      </main>
    </div>
  );
}