import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiSettings, 
  FiClipboard,
  FiUserCheck,
  FiBarChart2
} from 'react-icons/fi';

const menuItems = [
  { 
    path: '/admin/dashboard', 
    icon: <FiHome className="sidebar-icon" />, 
    name: 'Dashboard',
    description: 'Vista general del sistema'
  },
  { 
    path: '/admin/team', 
    icon: <FiUsers className="sidebar-icon" />, 
    name: 'Miembros del Equipo',
    description: 'Gestionar profesionales y staff'
  },
  { 
    path: '/admin/services', 
    icon: <FiClipboard className="sidebar-icon" />, 
    name: 'Servicios',
    description: 'Administrar servicios ofrecidos'
  },
  { 
    path: '/admin/schedule', 
    icon: <FiCalendar className="sidebar-icon" />, 
    name: 'Calendario',
    description: 'Gestionar agenda y citas'
  },
  { 
    path: '/admin/clients', 
    icon: <FiUserCheck className="sidebar-icon" />, 
    name: 'Clientes',
    description: 'Administrar información de clientes'
  },
  { 
    path: '/admin/reports', 
    icon: <FiBarChart2 className="sidebar-icon" />, 
    name: 'Reportes',
    description: 'Ver reportes y estadísticas'
  },
  { 
    path: '/admin/settings', 
    icon: <FiSettings className="sidebar-icon" />, 
    name: 'Configuración',
    description: 'Ajustes del sistema'
  },
];

const NewSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-primary">
          Integra<span className="font-bold">Mente</span>
        </h1>
      </div>
      
      {/* Menú */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Menú Principal
        </h3>
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} IntegraMente
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
