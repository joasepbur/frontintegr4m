import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './SelectDate.css';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';

const SelectDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services, total, collaborator } = location.state || {};

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);


  const days = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, [currentDate]);

  useEffect(() => {
    if (!services || !collaborator) {
      navigate('/booking');
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);

      setAvailableSlots([]);
      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        // Asumimos que solo se puede reservar un servicio a la vez, por lo que tomamos el ID del primero.
        const serviceId = services[0]?.id;
        if (!serviceId) {
          console.error("No se pudo encontrar un ID de servicio.");
          setAvailableSlots([]);
          return;
        }

        const queryString = new URLSearchParams({
          collaborator_id: collaborator.id,
          service_id: serviceId,
          date: dateString
        }).toString();

        const response = await fetch(`https://integramentehwh.com/backend/available_slots.php?${queryString}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar los horarios');
        }

        setAvailableSlots(data);
      } catch (err) {

        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate, collaborator, services, navigate]);



  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const changeWeek = (amount) => {
    setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() + amount * 7);
        return newDate;
    });
  };

  const handleTimeSelect = (slot) => {
    const [hour, minute] = slot.split(':');
    const bookingDate = new Date(selectedDate);
    bookingDate.setHours(hour, minute, 0, 0);

    navigate('/booking/confirm', {
      state: {
        services,
        collaborator,
        selectedSlot: bookingDate,
      },
    });
  };

  return (
    <div className="page-container">
      <header className="services-header">
        <button onClick={() => navigate('/booking/select-collaborator', { state: { services, total } })} className="back-button"><FaArrowLeft /></button>
        <div className="breadcrumbs">
          <span className="inactive">Servicios</span>
          <span className="separator">&gt;</span>
          <span className="inactive">Colaborador</span>
          <span className="separator">&gt;</span>
          <span className="active">Hora</span>
          <span className="separator">&gt;</span>
          <span className="inactive">Confirmar</span>
        </div>
        <button className="close-button"><FaTimes /></button>
      </header>

      <div className="services-content">
        <main className="services-main-content">
          <h1 className="main-title">Seleccionar hora</h1>
          
          <div className="professional-card">
            <img src={collaborator?.foto_url || 'https://via.placeholder.com/40'} alt={collaborator?.nombre} className="avatar" />
            <span className="professional-name">{collaborator?.nombre || 'Profesional'}</span>
          </div>

          <div className="date-selector">
            <div className="date-selector-header">
              <span className="current-month">{selectedDate.toLocaleString('es-CL', { month: 'long', year: 'numeric' })}</span>
              <div className="week-nav-buttons">
                <button onClick={() => changeWeek(-1)} aria-label="Semana anterior"><FiChevronLeft /></button>
                <button onClick={() => changeWeek(1)} aria-label="Siguiente semana"><FiChevronRight /></button>
              </div>
            </div>
            <div className="week-days-container">
              {days.map(day => (
                <div 
                    key={day.toISOString()}
                    className={`week-day-item ${selectedDate.toDateString() === day.toDateString() ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(day)}
                >
                  <span className="day-short-name">{day.toLocaleString('es-CL', { weekday: 'short' })}</span>
                  <span className="day-number">{day.getDate()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="availability-container">
            {loading ? (
              <p className="loading-text">Buscando horarios...</p>
            ) : availableSlots.length > 0 ? (
              <div className="time-slots-grid">
                {availableSlots.map(slot => (
                  <button key={slot} className="time-slot" onClick={() => handleTimeSelect(slot)}>
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-availability-notice">
                <img src={collaborator?.foto_url || 'https://via.placeholder.com/60'} alt="" className="notice-avatar" />
                <p className="notice-main-text">{collaborator?.nombre} no tiene citas disponibles para esta fecha.</p>
                <p className="notice-sub-text">Por favor, selecciona otro día.</p>
              </div>
            )}
          </div>
        </main>

        <aside className="booking-summary-sidebar">
          <div className="summary-header">
            <h4>IntegraMente</h4>
            <p>Mac Iver 1664, Concepción, Bío Bío</p>
          </div>
          <div className="summary-body">
            {services && services.map(s => (
              <div key={s.id} className="summary-item">
                <span>{s.nombre}</span>
                <span>{formatPrice(s.precio)}</span>
              </div>
            ))}
            {collaborator && (
              <div className="summary-item collaborator-selected">
                <span>Colaborador</span>
                <span>{collaborator.nombre}</span>
              </div>
            )}
          </div>
          <div className="summary-footer">
            <div className="total-price">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="continue-button">
              Continuar
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SelectDate;
