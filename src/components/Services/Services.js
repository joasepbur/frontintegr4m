import React, { useState } from 'react';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import './Services.css';
import { useNavigate } from 'react-router-dom';

const servicesData = {
  PSICOTERAPIA: [
    { name: 'Psicoterapia Particular Online', duration: '50 min', price: '18.655' },
    { name: 'Psicoterapia Particular Presencial', duration: '50 min', price: '24.000' },
  ],
  'TERAPIA OCUPACIONAL': [
    { name: 'Terapia Ocupacional Individual', duration: '45 min', price: '22.000' },
  ],
  PSICOPEDAGOGÍA: [
    { name: 'Evaluación Psicopedagógica', duration: '60 min', price: '30.000' },
  ],
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('PSICOTERAPIA');
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <div className="service-tabs">
          {Object.keys(servicesData).map((tab) => (
            <button
              key={tab}
              className={`service-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="service-list">
          {servicesData[activeTab].map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-card-info">
                <h3 className="service-card-title">{service.name}</h3>
                <div className="service-card-details">
                  <FiClock className="service-card-icon" />
                  <span>{service.duration}</span>
                  <span className="service-card-price">desde ${service.price}</span>
                </div>
              </div>
              <button className="service-card-button" onClick={() => navigate('/booking')}>
                Reservar <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
