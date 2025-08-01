import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';

const AdminPanel = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminPanel;
