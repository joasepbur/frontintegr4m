import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiTag, FiSmile, FiBookOpen, FiUser, FiSpeaker, FiUsers, FiTrendingUp, FiPlusSquare, FiSettings } from 'react-icons/fi';
import './IconSidebar.css';

const IconSidebar = () => {
  return (
    <div className="icon-sidebar">
      <nav className="icon-sidebar-nav">
        <a href="#" title="Home"><FiHome size={24} /></a>
        <NavLink to="/calendar" title="Calendar"><FiCalendar size={24} /></NavLink>
        <NavLink to="/services" title="Servicios"><FiBookOpen size={24} /></NavLink>
        <NavLink to="/clients" title="Smile"><FiSmile size={24} /></NavLink>
        <NavLink to="/team/members" title="Team"><FiUsers size={24} /></NavLink>
      </nav>
      <div className="icon-sidebar-footer">
        <a href="#" title="Settings"><FiSettings size={24} /></a>
      </div>
    </div>
  );
};

export default IconSidebar;
