import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './MyAppointments.css'; // Crearemos este archivo para los estilos

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!authState.token) {
        setError('Debes iniciar sesión para ver tus citas.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://integramentehwh.com/backend/my_appointments.php', {
          headers: {
            'Authorization': `Bearer ${authState.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          throw new Error(data.message || 'No se pudieron cargar las citas.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [authState.token]);

  if (loading) {
    return <div className="loading-container">Cargando tus citas...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="my-appointments-container">
      <h1>Mis Citas</h1>
      {appointments.length > 0 ? (
        <ul className="appointments-list">
          {appointments.map(apt => (
            <li key={apt.id} className={`appointment-item status-${apt.estado}`}>
              <div className="appointment-details">
                <span className="service-name">{apt.servicio_nombre}</span>
                <span className="collaborator-name">con {apt.colaborador_nombre}</span>
                <span className="appointment-time">
                  {new Date(apt.fecha + 'T' + apt.hora_inicio).toLocaleString('es-CL', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="appointment-status">
                <span className={`status-badge`}>{apt.estado}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes ninguna cita programada.</p>
      )}
    </div>
  );
};

export default MyAppointments;
