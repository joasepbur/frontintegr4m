import React, { useState, useEffect } from 'react';
import './TeamSidebar.css';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

const TeamSidebar = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/team/members');
      if (!response.ok) throw new Error('Error al obtener los miembros');
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (memberId) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar este miembro?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/team/members/${memberId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar el miembro');
      setMembers(members.filter(member => member.id !== memberId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="team-sidebar">
      <h2>Miembros del Equipo</h2>
      {error && <div className="error-message">{error}</div>}
      <ul className="member-list">
        {members.map(member => (
          <li key={member.id} className="member-item">
            <span className="member-name">{member.name}</span>
            <button className="delete-button" onClick={() => handleDelete(member.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamSidebar;
