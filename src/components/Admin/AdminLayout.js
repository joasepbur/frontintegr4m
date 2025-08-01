import React from 'react';
import AdminPanel from '../../pages/Admin/AdminPanel';

const AdminLayout = ({ children }) => {
  return (
    <AdminPanel>
      {children}
    </AdminPanel>
  );
};

export default AdminLayout;
