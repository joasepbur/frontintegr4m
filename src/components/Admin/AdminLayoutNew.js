import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: '🏠' },
  { name: 'Miembros', path: '/team/members', icon: '👥' },
  { name: 'Servicios', path: '/services/menu', icon: '💼' },
  { name: 'Calendario', path: '/calendar', icon: '📅' },
  { name: 'Clientes', path: '/clients', icon: '👤' },
  { name: 'Reportes', path: '/admin/reports', icon: '📊' },
  { name: 'Configuración', path: '/admin/settings', icon: '⚙️' },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  const currentPage = menuItems.find(item => 
    location.pathname === item.path || 
    (item.path !== '/admin' && location.pathname.startsWith(item.path))
  );

  return (
    <div className="admin-content">
      {/* Breadcrumbs y título de sección */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <span className="text-blue-600 mr-2">
                {currentPage?.icon || '📊'}
              </span>
              {currentPage?.name || 'Dashboard'}
            </h1>
            <Breadcrumbs />
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {children || <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
