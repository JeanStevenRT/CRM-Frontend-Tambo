import React from 'react';
import {Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './Buttons.css'
import './index.css'
import DashboardLayout from './components/Dashboard/DashboardLayout';
import AssignedTasks from './pages/AssignedTasks';
import CreateTask from './pages/CreateTask';
import CompletedTasks   from './pages/CompletedTasks';   
import ProtectedRoute from './components/ProtectedRoute';
import PendingAdmin from './pages/PendingAdmin'; 
import InReviewAdmin from './pages/InReviewAdmin';
import UserCreate  from './pages/UserCreate'; 
import UsersList from './pages/UsersList'; 
import AssignedTasksUser from './pages/AssignedTasksUser';
import CalendarAdmin from './pages/CalendarAdmin';
import TaskHistory from './pages/TaskHistory';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AssignedTasks />} />
        <Route path="create" element={<CreateTask />} />
        <Route path="assigned-task-user" element={<AssignedTasksUser />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="pending-admin" element={<PendingAdmin />} />
        <Route path="in-review-admin" element={<InReviewAdmin />} />
        <Route path="user-create" element={<UserCreate />} />
        <Route path="users-list" element={<UsersList />} />
        <Route path="calendar" element={<CalendarAdmin />} />
          <Route path="calendar/task/:id" element={<TaskHistory />} />
      </Route>
      
    </Routes>
  );
}
