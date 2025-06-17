
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import'../Dashboard/DashboardLayout.css';

export default function DashboardLayout() {
  
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}