import React from 'react';
import { NavLink } from 'react-router-dom';
import './CatalogSidebar.css';

const CatalogSidebar = () => {
  return (
    <aside className="catalog-sidebar">
      <div className="sidebar-section">
        <h2 className="sidebar-title">Catálogo</h2>
        <nav className="sidebar-nav">
          <li><NavLink to="/services/menu" className={({ isActive }) => isActive ? 'active' : ''}>Menú de servicios</NavLink></li>
          <li><NavLink to="/services/memberships" className={({ isActive }) => isActive ? 'active' : ''}>Membresías</NavLink></li>
          <li><NavLink to="/services/products" className={({ isActive }) => isActive ? 'active' : ''}>Productos</NavLink></li>
        </nav>
      </div>
      <div className="sidebar-section">
        <h2 className="sidebar-title">Gestión de inventario</h2>
        <nav className="sidebar-nav">
          <li><NavLink to="/inventory/list" className={({ isActive }) => isActive ? 'active' : ''}>Inventarios</NavLink></li>
          <li><NavLink to="/inventory/stock-orders" className={({ isActive }) => isActive ? 'active' : ''}>Pedidos de stock</NavLink></li>
          <li><NavLink to="/inventory/suppliers" className={({ isActive }) => isActive ? 'active' : ''}>Proveedores</NavLink></li>
        </nav>
      </div>
    </aside>
  );
};

export default CatalogSidebar;
