import React from 'react';
import { format, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import './ScheduleGrid.css';

const ScheduleGrid = ({ teamMembers, shifts, weekDays }) => {

  const getShiftsForMemberAndDay = (memberId, day) => {
    // date-fns: Domingo=0, Lunes=1, ..., Sábado=6
    // Base de datos: Lunes=1, ..., Domingo=7
    const dayOfWeek = getDay(day);
    const dbDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    return shifts
      .filter(shift => 
        shift.colaborador_id === memberId && shift.dia_semana === dbDayOfWeek
      )
      .map(shift => ({
        ...shift,
        startTime: shift.hora_inicio, // Ya viene formateado como HH:mm
        endTime: shift.hora_fin,     // Ya viene formateado como HH:mm
      }));
  };

  return (
    <>
      <div className="schedule-grid-container">
        <header className="grid-header">
          <div className="header-cell">Profesional</div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="header-cell day-header">
              <span className="day-name">{format(day, 'EEE', { locale: es })}</span>
              <span className="day-number">{format(day, 'd', { locale: es })}</span>
            </div>
          ))}
        </header>
        <main>
          {teamMembers.map(member => (
            <div key={member.id} className="grid-row">
              <div className="member-info">
                <img src={member.url_imagen || 'https://via.placeholder.com/44'} alt={`${member.nombre} ${member.apellido}`} />
                <div>
                  <div className="member-name">{`${member.nombre} ${member.apellido}`}</div>
                  <div className="member-role">{member.rol}</div>
                </div>
              </div>
              {weekDays.map(day => {
                const dayShifts = getShiftsForMemberAndDay(member.id, day);

                return (
                  <div key={day.toISOString()} className="day-cell">
                    {dayShifts.length > 0 ? (
                      dayShifts.map(shift => (
                        <div key={shift.id} className="shift-block">
                          {`${shift.startTime} - ${shift.endTime}`}
                        </div>
                      ))
                    ) : (
                      <div className="empty-cell"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default ScheduleGrid;
