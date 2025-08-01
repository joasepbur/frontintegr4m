import React, { useState } from 'react';
import './TimeSelector.css';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

const getWeekStartDate = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  d.setHours(0, 0, 0, 0);
  return new Date(d.setDate(diff));
};

const TimeSelector = ({ professional, onSelectTime }) => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimes = {
    '2025-12-05': ['19:00', '20:00'],
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStartDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStartDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(weekStartDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekStartDate(prevWeek);
  };

  const renderWeek = () => {
    const days = [];
    const weekdays = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStartDate);
      day.setDate(day.getDate() + i);
      const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div 
          key={day.toISOString()} 
          className="day-container"
          onClick={() => setSelectedDate(day)}
        >
          <div className={`day-circle ${isSelected ? 'selected' : ''}`}>
            <span>{day.getDate()}</span>
          </div>
          <span className="day-name">{weekdays[day.getDay() === 0 ? 6 : day.getDay() - 1]}</span>
        </div>
      );
    }
    return days;
  };

  const handleTimeSelect = (time) => {
    const newSelectedTime = { date: selectedDate, time };
    setSelectedTime(newSelectedTime);
    if (onSelectTime) {
      onSelectTime(newSelectedTime);
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return availableTimes[key] || [];
  }

  return (
    <div className="time-selector-container">
      <div className="time-selector-header">
        <h2>Seleccionar hora</h2>
        <div className="professional-dropdown">
          <img src={professional.avatar} alt={professional.name} />
          <span>{professional.name}</span>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <h3>{weekStartDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
          <div>
            <button onClick={handlePrevWeek}><FaChevronLeft /></button>
            <button onClick={handleNextWeek}><FaChevronRight /></button>
          </div>
        </div>
        <div className="week-view">{renderWeek()}</div>
      </div>

      <div className="available-times">
        {formatSelectedDate().length > 0 ? (
          formatSelectedDate().map(time => 
            <div 
              key={time} 
              className={`time-slot ${selectedTime?.time === time ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </div>
          )
        ) : (
          <div className="no-availability">
            <img src={professional.avatar} alt={professional.name} />
            <p><strong>{professional.name} no tiene citas disponibles para esta fecha</strong></p>
            <span>Disponible desde jue. 10 jul</span>
            <div>
              <button>Ir a la próxima fecha disponible</button>
              <button className="secondary">Únete a la lista de espera</button>
            </div>
          </div>
        )}
      </div>
      <div className="waitlist-link">
        ¿Ninguna cita te viene bien? <a href="#">Únete a la lista de espera</a>
      </div>
    </div>
  );
};

export default TimeSelector;
