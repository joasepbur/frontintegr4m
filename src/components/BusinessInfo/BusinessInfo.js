import React, { useState, useEffect } from 'react';
import './BusinessInfo.css';
import { FiCheckCircle, FiUser, FiMapPin, FiClock } from 'react-icons/fi';

const openingHoursData = {
  // 0: Domingo, 1: Lunes, etc.
  1: { day: 'Lunes', open: 9, close: 20, isClosed: false },
  2: { day: 'Martes', open: 9, close: 20, isClosed: false },
  3: { day: 'Miércoles', open: 9, close: 20, isClosed: false },
  4: { day: 'Jueves', open: 9, close: 20, isClosed: false },
  5: { day: 'Viernes', open: 9, close: 20, isClosed: false },
  6: { day: 'Sábado', isClosed: true },
  0: { day: 'Domingo', isClosed: true },
};

const BusinessInfo = () => {
  const [status, setStatus] = useState({ isOpen: false, text: 'Cerrado' });
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const currentHour = now.getHours();
      const schedule = openingHoursData[dayOfWeek];

      if (schedule && !schedule.isClosed) {
        if (currentHour >= schedule.open && currentHour < schedule.close) {
          setStatus({ isOpen: true, text: 'Abierto ahora' });
        } else {
          setStatus({ isOpen: false, text: 'Cerrado ahora' });
        }
      } else {
        setStatus({ isOpen: false, text: 'Cerrado ahora' });
      }
      setCurrentDay(dayOfWeek);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="business-info-section">
      <div className="business-info-container">
        <div className="info-content">
          <div className="info-card-header">
            <h3 className="info-card-title">Horario de Apertura</h3>
            <span className={`status-badge ${status.isOpen ? 'open' : 'closed'}`}>{status.text}</span>
          </div>
          <p className="info-subtitle">Encuéntranos en nuestro horario habitual. ¡Te esperamos!</p>
          <ul className="info-list">
            {Object.values(openingHoursData).map((item) => (
              <li key={item.day} className={`hours-item ${currentDay === Object.keys(openingHoursData).find(key => openingHoursData[key].day === item.day) ? 'today' : ''}`}>
                <strong>{item.day}</strong>
                <span className="hours-dots"></span>
                <span>{item.isClosed ? 'Cerrado' : `${item.open}:00 – ${item.close}:00`}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="map-container">
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.8141165317365!2d-73.03809032418273!3d-36.8229739780657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b42defe8f76d%3A0x774d5da153afc3fe!2zTWFjIEl2ZXIgMTY2NCwgNDA3MDM2MCBDb25jZXBjacOzbiwgQsOtbyBCw61v!5e0!3m2!1ses-419!2scl!4v1753309091683!5m2!1ses-419!2scl" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen=""
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación del negocio">
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;
