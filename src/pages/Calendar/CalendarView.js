import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiFilter, FiSettings, FiRefreshCw, FiChevronDown, FiPlus, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import './CalendarView.css';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [teamMembers, setTeamMembers] = useState([]);
  const [appointments, setAppointments] = useState([]);

    useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/team-members', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (teamMembers.length === 0) return;
      const dateString = currentDate.toISOString().split('T')[0];
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication token not found.');

        const response = await fetch(`/api/appointments/${dateString}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorBody}`);
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
    fetchAppointments();
  }, [currentDate, teamMembers]);

  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  const timeSlotIntervalHeight = 40; // Height of a 30-minute interval in pixels

  const calculateAppointmentStyle = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const calendarStart = new Date('1970-01-01T00:00:00');

    const top = ((start - calendarStart) / (1000 * 60 * 30)) * timeSlotIntervalHeight;
    const height = ((end - start) / (1000 * 60 * 30)) * timeSlotIntervalHeight;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const gridStyle = { '--num-members': teamMembers.length };

  const handlePrevDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const formatDate = (date) => {
    let formatted = new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    }).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).replace(/\./g, '');
  };

  return (
    <div className="calendar-view-container">
      <header className="calendar-header">
        <div className="calendar-header-left">
            <button className="btn-secondary">Inicio</button>
            <div className="date-navigation">
                <button className="nav-btn" onClick={handlePrevDay}><FiChevronLeft /></button>
                <span className="current-date">{formatDate(currentDate)}</span>
                <button className="nav-btn" onClick={handleNextDay}><FiChevronRight /></button>
            </div>
            <button className="btn-secondary dropdown">Todo el equipo <FiChevronDown /></button>
            <button className="btn-secondary icon-btn"><FiFilter /></button>
        </div>
        <div className="calendar-header-right">
            <button className="btn-secondary icon-btn"><FiSettings /></button>
            <button className="btn-secondary icon-btn"><FiCalendar /></button>
            <button className="btn-secondary icon-btn"><FiRefreshCw /></button>
            <button className="btn-secondary dropdown">Día <FiChevronDown /></button>
            <button className="btn-primary dropdown">Añadir <FiChevronDown /></button>
        </div>
      </header>
      <div className="calendar-main">
        <div className="calendar-grid-header" style={gridStyle}>
            <div className="time-col-header"></div> {/* Empty corner */}
            {teamMembers.map(member => (
                <div key={member.id} className="member-col-header">
                    <div className="avatar-wrapper">
                        <img src={member.url_imagen || 'https://i.pravatar.cc/40'} alt={`${member.nombre} ${member.apellido}`} />
                    </div>
                    <span>{`${member.nombre} ${member.apellido}`}</span>
                </div>
            ))}
        </div>
        <div className="calendar-grid-body" style={gridStyle}>
            <div className="time-column">
                {timeSlots.map(time => (
                    <div key={time} className="time-slot">{time}</div>
                ))}
            </div>
            <div className="schedule-columns">
                {teamMembers.map(member => (
                    <div key={member.id} className="member-schedule-col">
                        {appointments
                            .filter(apt => apt.memberId === member.id)
                            .map(apt => (
                                <div 
                                    key={apt.id} 
                                    className="appointment-block"
                                    style={calculateAppointmentStyle(apt.startTime, apt.endTime)}
                                >
                                    {apt.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
