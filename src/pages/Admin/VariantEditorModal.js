import React, { useState, useEffect } from 'react';
import './VariantEditorModal.css'; // Reutilizamos los estilos existentes

const VariantEditorModal = ({ variant, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
  });

  useEffect(() => {
    if (variant) {
      setFormData({
        name: variant.name || '',
        price: variant.price || '',
        duration: variant.duration || '',
      });
    } else {
      setFormData({ name: '', price: '', duration: '' });
    }
  }, [variant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="variant-editor-overlay" onClick={onClose}>
      <div className="variant-editor-container" onClick={(e) => e.stopPropagation()}>
        <div className="variant-editor-header">
          <h3>{variant ? 'Editar variante' : 'Añadir variante'}</h3>
        </div>
        <div className="variant-editor-body">
          <div className="form-group">
            <label htmlFor="name">Nombre de la variante</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="p. ej., Psicoterapia Particular Online"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <div className="input-with-adornment">
                <span>CLP</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duración</label>
              <div className="input-with-adornment">
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="50"
                />
                <span>min.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="variant-editor-footer">
          <button onClick={onClose} className="btn-cancel-variant">Cancelar</button>
          <button onClick={handleSave} className="btn-save-variant">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default VariantEditorModal;
