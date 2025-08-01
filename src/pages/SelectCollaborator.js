import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './SelectCollaborator.css';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';

const SelectCollaborator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services, total } = location.state || { services: [], total: 0 };

  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (services.length === 0) {
      navigate('/booking');
      return;
    }

    const fetchCollaborators = async () => {
      try {
        const serviceId = services[0].id;
                        const response = await fetch(`https://integramentehwh.com/backend/collaborators.php?service_id=${serviceId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar los colaboradores');
        }
        setCollaborators(data);
      } catch (err) {
        setError('No se pudieron cargar los colaboradores. Por favor, intente más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);



  const handleSelectCollaborator = (collaborator) => {
    setSelectedCollaborator(collaborator);
  };

  const handleContinue = () => {
    if (selectedCollaborator) {
      navigate('/booking/select-date', {
        state: { 
          services,
          total,
          collaborator: selectedCollaborator
        }
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="select-collaborator-page-container"><div className="loading-message">Cargando...</div></div>;
  }

  if (error) {
    return <div className="select-collaborator-page-container"><div className="error-message">{error}</div></div>;
  }

  return (
    <div className="select-collaborator-page-container">
      <header className="services-header">
        <button onClick={() => navigate('/booking')} className="back-button"><FaArrowLeft /></button>
        <div className="breadcrumbs">
          <span className="inactive">Servicios</span>
          <span className="separator">&gt;</span>
          <span className="active">Colaborador</span>
          <span className="separator">&gt;</span>
          <span className="inactive">Hora</span>
          <span className="separator">&gt;</span>
          <span className="inactive">Confirmar</span>
        </div>
        <button className="close-button"><FaTimes /></button>
      </header>

      <div className="services-content">
        <main className="services-main-content">
          <h1 className="main-title">Elige un colaborador</h1>
          <div className="collaborator-list">
          {collaborators.map(collab => {
  console.log(collab); // 👈 TEMPORAL: revisa qué trae exactamente
  return (
    <div 
      key={collab.id}
      className={`collaborator-item ${selectedCollaborator?.id === collab.id ? 'selected' : ''}`}
      onClick={() => handleSelectCollaborator(collab)}
    >
      <img src={collab.foto_url || '/default-avatar.png'} alt={collab.nombre} className="collaborator-avatar" />
      <div className="collaborator-details">
        <h4>{collab.nombre} {collab.apellido}</h4>
        <p>{collab.especialidad}</p>
      </div>
    </div>
  );
})}

          </div>
          <div className="continue-button-container">
            <button 
              onClick={handleContinue} 
              className="continue-button" 
              disabled={!selectedCollaborator}
            >
              Continuar
            </button>
          </div>
        </main>

        <aside className="booking-summary-sidebar">
          <div className="summary-header">
             <h4>IntegraMente</h4>
             <p>Mac Iver 1664, Concepción, Bío Bío</p>
          </div>
          <div className="summary-body">
            {services.map(s => (
              <div key={s.id} className="summary-item">
                <span>{s.nombre}</span>
                <span>{formatPrice(s.precio)}</span>
              </div>
            ))}
             {selectedCollaborator && (
                <div className="summary-item collaborator-selected">
                    <span>Colaborador</span>
                    <span>{selectedCollaborator.nombre} {selectedCollaborator.apellido}</span>
                </div>
            )}
          </div>
          <div className="summary-footer">
            <div className="total-price">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button 
              className="continue-button" 
              disabled={!selectedCollaborator}
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SelectCollaborator;
