import React from 'react';
import { Outlet } from 'react-router-dom';
import IconSidebar from './Admin/IconSidebar';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <IconSidebar />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
