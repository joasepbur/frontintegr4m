import React from 'react';
import './Confirmation.css';

const Confirmation = ({ bookingSummary, selectedProfessional, selectedTime }) => {
  const service = bookingSummary[0];
  const total = bookingSummary.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace('.', ''));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  const formattedTotal = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total);

  if (!service || !selectedProfessional || !selectedTime) {
    return <div>Cargando resumen...</div>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-details">
        <div className="detail-item">
          <strong>Servicio:</strong>
          <span>{service.name}</span>
        </div>
        <div className="detail-item">
          <strong>Profesional:</strong>
          <span>{selectedProfessional.name}</span>
        </div>
        <div className="detail-item">
          <strong>Fecha y Hora:</strong>
          <span>
            {selectedTime.date.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            a las {selectedTime.time}
          </span>
        </div>
        <div className="detail-item total">
          <strong>Total:</strong>
          <span>{formattedTotal}</span>
        </div>
      </div>
      <p className="confirmation-note">
        Te enviaremos un correo electrónico con la confirmación de tu reserva.
      </p>
    </div>
  );
};

export default Confirmation;
