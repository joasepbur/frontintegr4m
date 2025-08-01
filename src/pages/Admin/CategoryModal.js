import React, { useState } from 'react';
import './CategoryModal.css';

const CategoryModal = ({ onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSaveClick = () => {
    if (categoryName.trim()) {
      onSave({ nombre: categoryName.trim() });
    } else {
      // Opcional: mostrar un error si el nombre está vacío
      alert('El nombre de la categoría no puede estar vacío.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content category-modal">
        <h2>Añadir nueva categoría</h2>
        <div className="form-group">
          <label htmlFor="category-name">Nombre de la categoría</label>
          <input
            id="category-name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Ej: Terapias alternativas"
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={handleSaveClick} className="btn-save">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
