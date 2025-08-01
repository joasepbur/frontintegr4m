import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiUsers, FiCalendar, FiSettings, 
  FiClipboard,  
} from 'react-icons/fi';
import './AdminSidebar.css';

const navLinks = {
  team: [
    { to: '/team/members', text: 'Miembros', icon: <FiUsers /> },
    { to: '/team/schedule', text: 'Turnos', icon: <FiCalendar /> },
  ],
  services: [
    { to: '/services/menu', text: 'Menú de Servicios', icon: <FiClipboard /> },
  ],
  clients: [
    { to: '/clients', text: 'Clientes', icon: <FiUsers /> },
  ],
  calendar: [
    { to: '/calendar', text: 'Calendario', icon: <FiCalendar /> },
  ],
};

const AdminSidebar = () => {
  const location = useLocation();

  const getActiveSection = () => {
    const path = location.pathname;
    if (path.startsWith('/team')) return 'team';
    if (path.startsWith('/services')) return 'services';
    if (path.startsWith('/clients')) return 'clients';
    if (path.startsWith('/calendar')) return 'calendar';
    return 'team';
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Integra<span className="logo-highlight">Mente</span></h1>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <h2 className="section-title">Equipo</h2>
          {navLinks.team.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {link.icon}<span className="nav-text">{link.text}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section">
          <h2 className="section-title">Servicios</h2>
          {navLinks.services.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {link.icon}<span className="nav-text">{link.text}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section">
          <h2 className="section-title">Clientes</h2>
          <NavLink to="/clients" className={({ isActive }) => `nav-item single ${isActive ? 'active' : ''}`}>
            <FiUsers /><span className="nav-text">Clientes</span>
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiSettings /><span className="nav-text">Ajustes</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
