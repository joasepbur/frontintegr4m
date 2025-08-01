import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../ConfirmBooking.css'; // Import the new styles

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services, collaborator, selectedSlot } = location.state || {};

  const token = localStorage.getItem('token');

  if (!collaborator || !selectedSlot || !services) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>No se han proporcionado los detalles de la cita. Por favor, vuelve a empezar el proceso de reserva.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Volver al Inicio
        </button>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    try {
      const bookingDetails = {
        collaborator_id: collaborator.id,
        service_id: services[0].id, // Asume que se reserva el primer servicio
        start_time: selectedSlot.toISOString(),
      };

      const response = await fetch('https://integramentehwh.com/backend/create_appointment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Cita confirmada con éxito!');
        // Redirige a una página de 'mis citas'
        navigate('/my-appointments');
      } else {
        throw new Error(data.message || 'No se pudo confirmar la cita.');
      }
    } catch (error) {
      console.error('Error al confirmar la cita:', error);
      alert(error.message || 'Hubo un error al confirmar tu cita. Por favor, inténtalo de nuevo.');
    }
  };

  const total = services.reduce((acc, service) => acc + service.precio, 0);

  return (
    <div className="confirm-booking-page">
        <div className="confirmation-card">
            <h1>Confirma tu Cita</h1>

            <div className="booking-details">
                <div className="detail-item">
                    <span className="detail-label">Profesional</span>
                    <span className="detail-value">{collaborator.nombre} {collaborator.apellido}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Servicio</span>
                    <span className="detail-value">{services.map(s => s.nombre).join(', ')}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Fecha y Hora</span>
                    <span className="detail-value">{new Date(selectedSlot).toLocaleString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Precio</span>
                    <span className="detail-value">${total.toLocaleString('es-CL')}</span>
                </div>
            </div>

            {token ? (
                <button className="confirm-button" onClick={handleConfirmBooking}>Confirmar Cita</button>
            ) : (
                <div className="login-prompt">
                    <p>Debes iniciar sesión o registrarte para poder confirmar.</p>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => navigate('/login', { state: { from: location } })}>Iniciar Sesión</button>
                        <button className="btn btn-secondary" onClick={() => navigate('/register', { state: { from: location } })}>Registrarse</button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default ConfirmBooking;
