import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import api from '../../utils/api';
import ScheduleGrid from '../../components/Admin/ScheduleGrid';
import ShiftManager from '../../components/Admin/ShiftManager';
import './ScheduleView.css';

const ScheduleView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [teamMembers, setTeamMembers] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isShiftManagerOpen, setShiftManagerOpen] = useState(false);

  const weekStartsOn = 1; // Lunes

  const fetchScheduleData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const [membersResponse, shiftsResponse] = await Promise.all([
        fetch('https://integramentehwh.com/backend/get_all_collaborators.php', { headers }),
        fetch('https://integramentehwh.com/backend/admin_appointments.php', { headers })
      ]);

      if (!membersResponse.ok || !shiftsResponse.ok) {
        // Manejar errores de respuesta de la red
        throw new Error('Error al obtener los datos del servidor.');
      }

      const membersData = await membersResponse.json();
      const shiftsData = await shiftsResponse.json();

      setTeamMembers(membersData);
      setShifts(shiftsData);

    } catch (error) {
      console.error('Error fetching schedule data:', error);
      // Aquí podrías establecer un estado de error para mostrarlo en la UI
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  const handlePreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };

  const start = startOfWeek(currentDate, { weekStartsOn });
  const end = endOfWeek(currentDate, { weekStartsOn });
    const weekDays = eachDayOfInterval({ start, end });

  const handleShiftUpdate = () => {
    setShiftManagerOpen(false); // Primero, cerrar el modal
    // Luego, vuelve a cargar los datos para reflejar los cambios en los turnos
    fetchScheduleData();
  };

  const weekDisplay = `${format(start, 'd MMM', { locale: es })} - ${format(end, 'd MMM, yyyy', { locale: es })}`;

  return (
    <div>
      <div className="schedule-view-header">
        <h1>Turnos programados</h1>
        <div className="schedule-actions">
          <select 
            onChange={(e) => {
              const member = teamMembers.find(m => m.id === parseInt(e.target.value));
              setSelectedMember(member);
            }}
            value={selectedMember ? selectedMember.id : ''}
            className="member-select"
          >
            <option value="" disabled>Selecciona un profesional</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.nombre} {member.apellido}
              </option>
            ))}
          </select>
          <button 
            className="primary"
            onClick={() => setShiftManagerOpen(true)}
            disabled={!selectedMember}
          >
            Gestionar Horarios
          </button>
        </div>
      </div>

      <div className="week-navigator">
        <button onClick={handlePreviousWeek} className="week-nav-btn"><FiChevronLeft size={20} /></button>
        <span className="week-display">{weekDisplay}</span>
        <button onClick={handleNextWeek} className="week-nav-btn"><FiChevronRight size={20} /></button>
      </div>

      {loading ? (
        <p>Cargando horario...</p>
      ) : (
        <ScheduleGrid 
          teamMembers={teamMembers} 
          shifts={shifts} 
          weekDays={weekDays} 
          onShiftUpdate={handleShiftUpdate}
        />
      )}

      {isShiftManagerOpen && selectedMember && (
        <ShiftManager 
          collaborator={selectedMember} 
          onClose={handleShiftUpdate} 
        />
      )}
    </div>
  );
};

export default ScheduleView;
