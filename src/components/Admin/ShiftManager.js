import React, { useState, useEffect, useCallback } from 'react';
import './ShiftManager.css';

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const ShiftManager = ({ collaborator, onClose }) => {
    const [shifts, setShifts] = useState([]);
    const [newShift, setNewShift] = useState({ dia_semana: 1, hora_inicio: '09:00', hora_fin: '18:00' });
    const [error, setError] = useState('');

    const fetchShifts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://integramentehwh.com/backend/work_schedule_manager.php?collaborator_id=${collaborator.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al cargar los horarios.');
            setShifts(data);
        } catch (err) {
            setError(err.message);
        }
    }, [collaborator.id]);

    useEffect(() => {
        fetchShifts();
    }, [fetchShifts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShift(prev => ({ ...prev, [name]: value }));
    };

    const handleAddShift = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://integramentehwh.com/backend/work_schedule_manager.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...newShift, colaborador_id: collaborator.id })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al añadir el horario.');
            await fetchShifts(); // Recargar la lista de horarios
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteShift = async (shiftId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este turno?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://integramentehwh.com/backend/work_schedule_manager.php?shift_id=${shiftId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Error al eliminar el horario.');
                await fetchShifts(); // Recargar la lista de horarios
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="shift-manager-modal">
                <button onClick={onClose} className="close-btn">&times;</button>
                <h2>Gestionar Horarios de {collaborator.nombre}</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="shifts-list">
                    <h3>Turnos Actuales</h3>
                    {shifts.length > 0 ? (
                        <ul>
                            {shifts.map(shift => (
                                <li key={shift.id}>
                                    <span>{daysOfWeek[shift.dia_semana]}: {shift.hora_inicio.substring(0, 5)} - {shift.hora_fin.substring(0, 5)}</span>
                                    <button onClick={() => handleDeleteShift(shift.id)} className="delete-shift-btn">Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay turnos asignados.</p>
                    )}
                </div>
                <form onSubmit={handleAddShift} className="add-shift-form">
                    <h3>Añadir Nuevo Turno</h3>
                    <div className="form-inputs">
                        <select name="dia_semana" value={newShift.dia_semana} onChange={handleInputChange}>
                            {daysOfWeek.map((day, index) => (
                                <option key={index} value={index}>{day}</option>
                            ))}
                        </select>
                        <input type="time" name="hora_inicio" value={newShift.hora_inicio} onChange={handleInputChange} />
                        <input type="time" name="hora_fin" value={newShift.hora_fin} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="add-btn">Añadir</button>
                </form>
                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="save-and-close-btn">Guardar y Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default ShiftManager;
