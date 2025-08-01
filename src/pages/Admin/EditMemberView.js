import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './EditMemberView.css'; // The new CSS

const EditMemberView = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    nombre: '',
    apellido: '',
    email: '',
    especialidad: '',
    fecha_inicio_dia_mes: '',
    fecha_inicio_ano: '',
    tipo_empleo: '',
    id_externo: '',
    comentarios: '',
    url_imagen: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No autenticado.');

        const response = await fetch(`https://integramentehwh.com/backend/team_members_manager.php?member_id=${memberId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar los datos del miembro.');
        
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado.');

      const response = await fetch(`https://integramentehwh.com/backend/team_members_manager.php?member_id=${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(member)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al guardar los cambios.');

      navigate('/team/members'); // Navegar de vuelta a la lista
    } catch (err) {
      setError(err.message);
      console.error('Error saving changes:', err);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>; // A simple loading state
  if (error) return <div className="error-container">Error: {error}</div>; // A simple error state

  return (
    <div className="edit-member-container">
      <div className="edit-member-card">
        <header className="edit-member-card-header">
          <h1>Editar Miembro</h1>
          <div className="header-actions">
            <button className="btn btn-cancel" onClick={() => navigate('/team/members')}>
              Cancelar
            </button>
            <button className="btn btn-save" onClick={handleSaveChanges}>
              Guardar Cambios
            </button>
          </div>
        </header>
        <div className="edit-member-card-body">
          <section className="form-section">
            <h2>Perfil</h2>
            <p>Gestiona el perfil personal y la información de contacto del miembro del equipo.</p>
            <div className="profile-details">
              <div className="profile-avatar">
                <img src={member.url_imagen || `https://i.pravatar.cc/80?u=${memberId}`} alt="Avatar" />
              </div>
              <div className="profile-fields-container">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input id="nombre" type="text" name="nombre" value={member.nombre || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input id="apellido" type="text" name="apellido" value={member.apellido || ''} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div className="form-grid">
               <div className="form-group full-span">
                  <label htmlFor="email">Email *</label>
                  <input id="email" type="email" name="email" value={member.email || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group full-span">
                  <label htmlFor="especialidad">Puesto de trabajo</label>
                  <input id="especialidad" type="text" name="especialidad" value={member.especialidad || ''} onChange={handleInputChange} />
                </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Información sobre el trabajo</h2>
            <p>Gestiona la fecha de inicio, tipo de empleo y otros detalles laborales.</p>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fecha_inicio_dia_mes">Fecha de inicio</label>
                <input id="fecha_inicio_dia_mes" type="text" placeholder="15 septiembre" name="fecha_inicio_dia_mes" value={member.fecha_inicio_dia_mes || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="fecha_inicio_ano">Año</label>
                <input id="fecha_inicio_ano" type="text" placeholder="2024" name="fecha_inicio_ano" value={member.fecha_inicio_ano || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="tipo_empleo">Tipo de empleo</label>
                <select id="tipo_empleo" name="tipo_empleo" value={member.tipo_empleo || ''} onChange={handleInputChange}>
                  <option value="">Seleccionar...</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Contratista">Contratista</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_externo">ID de miembro del equipo</label>
                <input id="id_externo" type="text" name="id_externo" value={member.id_externo || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group full-span">
                <label htmlFor="comentarios">Comentarios</label>
                <textarea id="comentarios" name="comentarios" value={member.comentarios || ''} onChange={handleInputChange} placeholder="Añadir un comentario privado..."></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditMemberView;
