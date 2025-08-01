import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const breadcrumbNameMap = {
  '/admin': 'Dashboard',
  '/team': 'Equipo',
  '/team/members': 'Miembros del Equipo',
  '/team/members/new': 'Agregar Miembro',
  '/team/schedule': 'Horarios',
  '/services': 'Servicios',
  '/services/menu': 'Lista de Servicios',
  '/clients': 'Clientes',
  '/calendar': 'Calendario',
  '/reports': 'Reportes',
  '/settings': 'Configuración',
};

const Breadcrumbs = ({ className = '' }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'admin')) {
    return null; // No mostrar breadcrumbs en la raíz del admin
  }

  return (
    <nav className={`mb-6 ${className}`} aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li className="flex items-center">
          <Link 
            to="/admin" 
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
            title="Inicio"
          >
            <FiHome className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1);

          // No mostrar el dashboard dos veces
          if (to === '/admin') return null;

          return last ? (
            <li key={to} className="flex items-center" aria-current="page">
              <FiChevronRight className="mx-2 text-gray-400 w-4 h-4 flex-shrink-0" />
              <span className="text-gray-600 font-medium">{name}</span>
            </li>
          ) : (
            <li key={to} className="flex items-center">
              <FiChevronRight className="mx-2 text-gray-400 w-4 h-4 flex-shrink-0" />
              <Link 
                to={to} 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
