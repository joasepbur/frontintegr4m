import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiPlus, FiList, FiCalendar, FiSettings, 
  FiBarChart2, FiHelpCircle, FiChevronLeft, FiChevronRight,
  FiBell, FiSearch, FiUser, FiLogOut
} from 'react-icons/fi';

const AdminPanel = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <FiHome />, 
      description: 'Vista general del sistema',
      tooltip: 'Resumen de actividad, citas del día y métricas importantes'
    },
    { 
      name: 'Miembros', 
      path: '/team/members', 
      icon: <FiUsers />, 
      description: 'Gestionar el equipo',
      tooltip: 'Ver, editar y administrar todos los miembros del equipo médico'
    },
    { 
      name: 'Agregar Miembro', 
      path: '/team/members/new', 
      icon: <FiPlus />, 
      description: 'Nuevo profesional',
      tooltip: 'Registrar un nuevo miembro del equipo con su información profesional'
    },
    { 
      name: 'Servicios', 
      path: '/services/menu', 
      icon: <FiList />, 
      description: 'Administrar servicios',
      tooltip: 'Configurar servicios, categorías, precios y disponibilidad'
    },
    { 
      name: 'Calendario', 
      path: '/calendar', 
      icon: <FiCalendar />, 
      description: 'Horarios y citas',
      tooltip: 'Ver y gestionar todas las citas y horarios del centro'
    },
    { 
      name: 'Clientes', 
      path: '/clients', 
      icon: <FiUsers />, 
      description: 'Gestionar pacientes',
      tooltip: 'Administrar información de pacientes y su historial'
    },
    { 
      name: 'Reportes', 
      path: '/admin/reports', 
      icon: <FiBarChart2 />, 
      description: 'Análisis y estadísticas',
      tooltip: 'Ver reportes de ingresos, citas y rendimiento del centro'
    },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Modern Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-neutral-200 shadow-soft flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Header with Logo */}
        <div className="p-6 border-b border-neutral-100 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
                <FiHome className="text-white text-xl" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-xl font-bold text-white">IntegraMente</h2>
                  <p className="text-primary-100 text-xs">Panel Administrativo</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-3 mb-4">
              Navegación Principal
            </h3>
          )}
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                             (item.path !== '/admin' && location.pathname.startsWith(item.path));
              
              return (
                <div key={item.path} className="relative group">
                  <Link 
                    to={item.path}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary-600 text-white shadow-md transform scale-[1.02]' 
                        : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    onMouseEnter={() => setTooltipVisible(index)}
                    onMouseLeave={() => setTooltipVisible(null)}
                  >
                    <span className={`text-xl ${isActive ? 'text-white' : 'text-primary-500'} ${sidebarCollapsed ? '' : 'mr-3'}`}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="block font-medium text-sm">{item.name}</span>
                        <span className={`block text-xs ${isActive ? 'text-primary-100' : 'text-neutral-500'}`}>
                          {item.description}
                        </span>
                      </div>
                    )}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
                    )}
                  </Link>
                  
                  {/* Enhanced Tooltip for collapsed sidebar */}
                  {sidebarCollapsed && tooltipVisible === index && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-neutral-800 text-white text-sm rounded-lg shadow-xl p-3 w-64 border border-neutral-700">
                        <div className="flex items-start">
                          <FiHelpCircle className="text-primary-300 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-white mb-1">{item.name}</p>
                            <p className="text-neutral-300 text-xs">{item.tooltip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        
        {/* Settings and User Section */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50">
          <Link
            to="/admin/settings"
            className={`flex items-center p-3 rounded-xl transition-all duration-200 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <FiSettings className={`text-lg ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span className="font-medium">Configuración</span>}
          </Link>
          
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                  <FiUser className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Administrador</p>
                  <p className="text-xs text-neutral-500">Sistema</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-700">
                <FiLogOut className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern Top Bar */}
        <header className="bg-white border-b border-neutral-200 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb/Title Area */}
            <div>
              <h1 className="text-xl font-semibold text-neutral-800">
                {menuItems.find(item => 
                  location.pathname === item.path || 
                  (item.path !== '/admin' && location.pathname.startsWith(item.path))
                )?.name || 'Panel Administrativo'}
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Gestiona y administra tu centro de salud mental
              </p>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 w-64 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                <FiBell className="text-lg" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
