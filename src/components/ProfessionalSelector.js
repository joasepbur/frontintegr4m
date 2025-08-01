import React, { useState } from 'react';
import './ProfessionalSelector.css';
import { FaUsers } from 'react-icons/fa';

// Mock data for professionals
const professionals = [
  { id: 'cristian', name: 'Cristian', role: 'Psicólogo', avatar: 'https://i.imgur.com/Ocrx1w2.png' },
  { id: 'nicolas', name: 'Nicolas', role: 'Psicólogo', avatar: 'https://i.imgur.com/8W3hE2s.png' }
];

const anyProfessional = { id: 'any', name: 'Cualquier profesional', role: 'para máxima disponibilidad', avatar: null };

const ProfessionalSelector = ({ onSelect }) => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleSelect = (prof) => {
    setSelectedProfessional(prof);
    if (onSelect) {
      onSelect(prof);
    }
  };

  return (
    <div className="professional-selector-container">
      <h2>Seleccionar profesional</h2>
      <div className="professional-list">
        <div 
          className={`professional-card ${selectedProfessional?.id === 'any' ? 'selected' : ''}`}
          onClick={() => handleSelect(anyProfessional)}
        >
          <div className="professional-avatar-icon">
            <FaUsers />
          </div>
          <h4>Cualquier profesional</h4>
          <p>para máxima disponibilidad</p>
        </div>
        {professionals.map(prof => (
          <div 
            key={prof.id} 
            className={`professional-card ${selectedProfessional?.id === prof.id ? 'selected' : ''}`}
            onClick={() => handleSelect(prof)}
          >
            <img src={prof.avatar} alt={prof.name} className="professional-avatar" />
            <h4>{prof.name}</h4>
            <p>{prof.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSelector;
