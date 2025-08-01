import React, { useState } from 'react';
import { format } from 'date-fns';
import './AddShiftModal.css';

const AddShiftModal = ({ isOpen, onClose, onSave, member, day }) => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateTime = new Date(day);
    const [startHours, startMinutes] = startTime.split(':');
    startDateTime.setHours(startHours, startMinutes);

    const endDateTime = new Date(day);
    const [endHours, endMinutes] = endTime.split(':');
    endDateTime.setHours(endHours, endMinutes);

    onSave({
      profesional_id: member.id,
      fecha_hora_inicio: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      fecha_hora_fin: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Añadir Turno</h2>
        <p><strong>Miembro:</strong> {`${member.nombre} ${member.apellido}`}</p>
        <p><strong>Fecha:</strong> {format(day, 'EEEE, d MMMM, yyyy')}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startTime">Hora de inicio</label>
            <input 
              type="time" 
              id="startTime" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">Hora de fin</label>
            <input 
              type="time" 
              id="endTime" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)} 
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-save">Guardar Turno</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftModal;
