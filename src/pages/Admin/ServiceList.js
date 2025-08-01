import React, { useState, useEffect, useCallback, useRef } from 'react';

import { FaPlus, FaSearch, FaEllipsisV, FaEdit, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ServiceEditor from './ServiceEditor';
import './ServiceList.css';

const ServiceActionsMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`service-item-actions ${isOpen ? 'open' : ''}`} ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="btn-icon">
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="actions-dropdown-item">
          <button onClick={onEdit}><FaEdit /> Editar</button>
          <button onClick={onDelete} className="danger"><FaTrashAlt /> Eliminar</button>
        </div>
      )}
    </div>
  );
};

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [editingService, setEditingService] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const fetchServicesAndCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado.');

      const [servicesRes, categoriesRes] = await Promise.all([
        fetch('https://integramentehwh.com/backend/services_manager.php', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://integramentehwh.com/backend/categories_manager.php', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!servicesRes.ok || !categoriesRes.ok) {
        throw new Error('Error al cargar los datos desde el servidor.');
      }

      const servicesData = await servicesRes.json();
      const categoriesData = await categoriesRes.json();

      setServices(servicesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Error al cargar los datos.");
    }
  }, []);

  useEffect(() => {
    fetchServicesAndCategories();
  }, [fetchServicesAndCategories]);

  const handleSaveService = async (serviceData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado.');

      const isEditing = !!editingService;
      const url = isEditing 
        ? `https://integramentehwh.com/backend/services_manager.php?id=${editingService.id}`
        : 'https://integramentehwh.com/backend/services_manager.php';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceData)
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error al guardar el servicio.');

      toast.success(`Servicio ${isEditing ? 'actualizado' : 'añadido'} con éxito`);
      
      fetchServicesAndCategories();
      setIsEditorOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error(error.message || 'Error al guardar el servicio.');
    }
  };

  const handleCreateNewService = () => {
    setEditingService(null);
    setIsEditorOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsEditorOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No autenticado.');

        const response = await fetch(`https://integramentehwh.com/backend/services_manager.php?id=${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Error al eliminar el servicio.');

        toast.success('Servicio eliminado con éxito');
        fetchServicesAndCategories();
      } catch (error) { 
        console.error('Error deleting service:', error);
        toast.error(error.message || 'Error al eliminar el servicio.');
      }
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingService(null);
  };

  const servicesByCategory = categories.map(category => ({
    ...category,
    services: services.filter(s => s.categoria === category.nombre)
  }));

  const displayedServices = activeCategory === 'all' 
    ? servicesByCategory 
    : servicesByCategory.filter(c => c.nombre === activeCategory);

  if (isEditorOpen) {
    return (
      <ServiceEditor 
        service={editingService} 
        categories={categories} 
        onClose={handleCloseEditor} 
        onSave={handleSaveService} 
      />
    );
  }

  return (
    <div className="service-menu-container">
      <aside className="service-menu-sidebar">
        <h4>CATEGORÍAS</h4>
        <ul>
          <li 
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            Todas las categorías
            <span>{services.length}</span>
          </li>
          {servicesByCategory.map(cat => (
            <li 
              key={cat.id} 
              className={activeCategory === cat.nombre ? 'active' : ''}
              onClick={() => setActiveCategory(cat.nombre)}
            >
              {cat.nombre}
              <span>{cat.services.length}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="service-menu-content">
        <div className="content-header">
          <div>
            <h2>Servicios</h2>
            <p>Gestiona los servicios ofrecidos a tus clientes.</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary" onClick={handleCreateNewService}>
              <FaPlus /> Añadir Servicio
            </button>
          </div>
        </div>

        <div className="content-toolbar">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar servicios..." />
          </div>
        </div>

        <div className="service-list">
          {displayedServices.map(category => (
            category.services.length > 0 && (
              <div key={category.id} className="service-category-group">
                <div className="category-group-header">
                  <h3>{category.nombre}</h3>
                  <p>{category.services.length} {category.services.length === 1 ? 'servicio' : 'servicios'}</p>
                </div>
                {category.services.map(service => (
                  <div className="service-item" key={service.id}>
                    <div className="service-item-color-accent"></div>
                    <div className="service-item-details">
                      <h4>{service.nombre}</h4>
                      <p>{service.descripcion_corta}</p>
                    </div>
                    <div className="service-item-price">
                      {service.variantes && service.variantes.length > 0 
                        ? `Desde ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Math.min(...service.variantes.map(v => v.precio)))}` 
                        : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(service.precio)}
                    </div>
                    <ServiceActionsMenu onEdit={() => handleEditService(service)} onDelete={() => handleDeleteService(service.id)} />
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default ServiceList;
