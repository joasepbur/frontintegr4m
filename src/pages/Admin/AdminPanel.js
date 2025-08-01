import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiPlus, FiList, FiCalendar, FiSettings, FiBarChart2, FiHome, FiHelpCircle } from 'react-icons/fi';
import Breadcrumbs from '../../components/Admin/Breadcrumbs';

const AdminPanel = ({ children }) => {
  const location = useLocation();
  const [tooltipVisible, setTooltipVisible] = useState(null);
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <FiHome />, 
      description: 'Vista general y estadísticas principales',
      tooltip: 'Resumen de actividad, citas del día y métricas importantes'
    },
    { 
      name: 'Miembros del Equipo', 
      path: '/team/members', 
      icon: <FiUsers />, 
      description: 'Gestionar profesionales y staff',
      tooltip: 'Ver, editar y administrar todos los miembros del equipo médico'
    },
    { 
      name: 'Agregar Miembro', 
      path: '/team/members/new', 
      icon: <FiPlus />, 
      description: 'Añadir nuevo profesional',
      tooltip: 'Registrar un nuevo miembro del equipo con su información profesional'
    },
    { 
      name: 'Servicios', 
      path: '/services/menu', 
      icon: <FiList />, 
      description: 'Administrar servicios y precios',
      tooltip: 'Configurar servicios, categorías, precios y disponibilidad'
    },
    { 
      name: 'Calendario', 
      path: '/calendar', 
      icon: <FiCalendar />, 
      description: 'Horarios y citas programadas',
      tooltip: 'Ver y gestionar todas las citas y horarios del centro'
    },
    { 
      name: 'Clientes', 
      path: '/clients', 
      icon: <FiUsers />, 
      description: 'Gestionar pacientes registrados',
      tooltip: 'Administrar información de pacientes y su historial'
    },
    { 
      name: 'Reportes', 
      path: '/admin/reports', 
      icon: <FiBarChart2 />, 
      description: 'Estadísticas y análisis',
      tooltip: 'Ver reportes de ingresos, citas y rendimiento del centro'
    },
    { 
      name: 'Configuración', 
      path: '/admin/settings', 
      icon: <FiSettings />, 
      description: 'Ajustes del sistema',
      tooltip: 'Configurar horarios, notificaciones y ajustes generales'
    }
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 shadow-sm flex-shrink-0 flex flex-col z-10 transition-all duration-300">
      {/* Logo y encabezado */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-700 to-blue-600">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
            <FiHome className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">IntegraMente</h2>
        </div>
        <p className="text-blue-100 text-xs mt-1">Panel de Administración</p>
      </div>
      
      {/* Menú de navegación */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Menú Principal</h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || 
                           (item.path !== '/admin' && location.pathname.startsWith(item.path));
            
            return (
              <div key={item.path} className="relative group">
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800 hover:translate-x-1'
                  }`}
                  onMouseEnter={() => setTooltipVisible(index)}
                  onMouseLeave={() => setTooltipVisible(null)}
                >
                  <span className={`text-xl mr-3 ${isActive ? 'text-white' : 'text-blue-600'}`}>
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium">{item.name}</span>
                    <span className={`block text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
                  )}
                </Link>
                
                {/* Tooltip mejorado */}
                {tooltipVisible === index && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-white text-sm rounded-lg shadow-xl p-3 w-64 border border-gray-700">
                      <div className="flex items-start">
                        <FiHelpCircle className="text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-100">{item.tooltip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      
      {/* Pie de página del sidebar */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Admin</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <FiSettings className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
