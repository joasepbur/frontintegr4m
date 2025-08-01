import React, { useState, useEffect } from 'react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import VariantEditorModal from './VariantEditorModal';
import './ServiceEditor.css';

// Componentes internos que antes estaban en ServiceModal
const ServiceVariant = ({ variant, onEdit, onDelete }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  return (
    <div className="variant-item">
      <div className="variant-info">
        <span className="variant-name">{variant.name}</span>
        <span className="variant-duration">{variant.duration} min</span>
      </div>
      <div className="variant-price-actions">
        <span className="variant-price">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(variant.price)}</span>
        <div className="actions-menu-container">
          <button className="btn-actions" onClick={() => setActionsVisible(!actionsVisible)}><FiMoreVertical /></button>
          {actionsVisible && (
            <div className="actions-dropdown">
              <button onClick={() => { onEdit(variant); setActionsVisible(false); }}>Editar</button>
              <button onClick={() => { onDelete(variant); setActionsVisible(false); }}>Eliminar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceEditor = ({ service, categories = [], onClose, onSave }) => {
  const [activeSection, setActiveSection] = useState('info');
  const [formData, setFormData] = useState({ nombre: '', descripcion_larga: '', categoria: '' });
  const [priceType, setPriceType] = useState('Fijo');
  const [variants, setVariants] = useState([]);
  const [fixedPriceData, setFixedPriceData] = useState({ precio: '', duracion: '' });
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  useEffect(() => {
    if (service) {
      const hasVariants = service.variants && Array.isArray(service.variants) && service.variants.length > 0;
      setFormData({ nombre: service.nombre || '', descripcion_larga: service.descripcion_larga || '', categoria: service.categoria || '' });
      setPriceType(hasVariants ? 'Variante' : 'Fijo');
      if (hasVariants) {
        setVariants(service.variants);
        setFixedPriceData({ precio: '', duracion: '' });
      } else {
        setFixedPriceData({ precio: service.precio || '', duracion: service.duracion || '' });
        setVariants([]);
      }
    } else {
      setFormData({ nombre: '', descripcion_larga: '', categoria: '' });
      setPriceType('Fijo');
      setVariants([]);
      setFixedPriceData({ precio: '', duracion: '' });
    }
  }, [service]);

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFixedPriceChange = (e) => setFixedPriceData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleOpenVariantModal = (variant = null) => {
    setEditingVariant(variant);
    setIsVariantModalOpen(true);
  };
  const handleDeleteVariant = (variantToDelete) => {
    setVariants(variants.filter(v => v.id !== variantToDelete.id));
  };
  const handleSaveVariant = (variantData) => {
    if (editingVariant) {
      setVariants(variants.map(v => (v.id === editingVariant.id ? { ...v, ...variantData } : v)));
    } else {
      setVariants([...variants, { ...variantData, id: Date.now() }]);
    }
    setIsVariantModalOpen(false);
  };

  const handleSaveClick = () => {
    const dataToSave = {
      ...formData,
      priceType,
      variants: priceType === 'Variante' ? variants : [],
      precio: priceType === 'Fijo' ? fixedPriceData.precio : null,
      duracion: priceType === 'Fijo' ? fixedPriceData.duracion : null,
    };
    onSave(dataToSave);
  };

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case 'info':
        return (
          <div className="form-section">
            <h3>Información básica</h3>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del servicio</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoría del servicio</label>
              <select id="categoria" name="categoria" value={formData.categoria} onChange={handleFormChange}>
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descripcion_larga">Descripción (opcional)</label>
              <textarea id="descripcion_larga" name="descripcion_larga" value={formData.descripcion_larga} onChange={handleFormChange} rows="4"></textarea>
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="form-section">
            <h3>Precios y duración</h3>
            {priceType === 'Fijo' ? (
              <>
                <div className="form-row-triple">
                  <div className="form-group">
                    <label htmlFor="priceType">Tipo de precio</label>
                    <select id="priceType">
                      <option>De</option>
                      <option>Gratis</option>
                      <option>Precio Fijo</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <div className="input-with-adornment">
                      <span>CLP</span>
                      <input type="number" id="precio" name="precio" value={fixedPriceData.precio} onChange={handleFixedPriceChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="duracion">Duración</label>
                    <select id="duracion" name="duracion" value={fixedPriceData.duracion} onChange={handleFixedPriceChange}>
                        <option value="30">30 min</option>
                        <option value="60">1 h</option>
                        <option value="90">1 h 30 min</option>
                        <option value="120">2 h</option>
                    </select>
                  </div>
                </div>
                <div className="pricing-actions">
                    <button className="btn-add-extra"><FiPlus/> Añadir tiempo adicional</button>
                    <div className="options-menu-container">
                        <button className="btn-options" onClick={() => setPriceType('Variante')}>Opciones</button>
                    </div>
                </div>
              </>
            ) : (
              <div className="variants-section">
                 <div className="variant-header">
                    <h4>Variantes de servicio</h4>
                    <button className="btn-link" onClick={() => setPriceType('Fijo')}>Quitar variantes</button>
                </div>
                {variants.map((variant, index) => (
                  <ServiceVariant key={variant.id || index} variant={variant} onEdit={handleOpenVariantModal} onDelete={handleDeleteVariant} />
                ))}
                <button className="btn-add-variant" onClick={() => handleOpenVariantModal()}>
                  <FiPlus /> Añadir variante
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isVariantModalOpen && (
        <VariantEditorModal
          variant={editingVariant}
          onClose={() => setIsVariantModalOpen(false)}
          onSave={handleSaveVariant}
        />
      )}
      <div className="service-editor-container">
        <div className="service-editor-header">
          <h1>{service ? 'Editar servicio' : 'Añadir servicio'}</h1>
          <div className="editor-header-actions">
            <button onClick={onClose} className="btn-cancel">Cerrar</button>
            <button onClick={handleSaveClick} className="btn-save">Guardar</button>
          </div>
        </div>
        <div className="service-editor-content">
          <aside className="editor-sidebar">
            <nav>
              <ul>
                <li className={activeSection === 'info' ? 'active' : ''} onClick={() => setActiveSection('info')}>Información básica</li>
                <li className={activeSection === 'pricing' ? 'active' : ''} onClick={() => setActiveSection('pricing')}>Precios y duración</li>
                <li className={activeSection === 'team' ? 'active' : ''} onClick={() => setActiveSection('team')}>
                  Miembros del equipo
                  <span className="badge">1</span>
                </li>
                <li className={activeSection === 'resources' ? 'active' : ''} onClick={() => setActiveSection('resources')}>
                  Recursos
                  <span className="badge">2</span>
                </li>
              </ul>
              <h4 className="sidebar-heading">Ajustes</h4>
              <ul>
                <li className={activeSection === 'booking' ? 'active' : ''} onClick={() => setActiveSection('booking')}>Reserva online</li>
                <li className={activeSection === 'forms' ? 'active' : ''} onClick={() => setActiveSection('forms')}>
                  Formularios
                  <span className="badge">1</span>
                </li>
                <li className={activeSection === 'commissions' ? 'active' : ''} onClick={() => setActiveSection('commissions')}>Comisiones</li>
                <li className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>Ajustes</li>
              </ul>
            </nav>
          </aside>
          <main className="editor-main">
            <div id="info" className="form-section-container">
              {renderSection('info')}
            </div>
            <div id="pricing" className="form-section-container">
              {renderSection('pricing')}
            </div>
          </main>
        </div>
      </div>
      {isVariantModalOpen && (
        <VariantEditorModal
          variant={editingVariant}
          onClose={() => setIsVariantModalOpen(false)}
          onSave={handleSaveVariant}
        />
      )}
    </>
  );
};

export default ServiceEditor;
