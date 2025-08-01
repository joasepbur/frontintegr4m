import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/Admin/ConfirmModal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import './TeamMembersView.css';
import { showErrorToast, showSuccessToast } from '../../utils/toastHelper';
import SkeletonLoader from '../../components/Admin/SkeletonLoader';
import { FiPlus, FiSearch, FiStar, FiMoreVertical, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

const TeamMembersView = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(null); // Para controlar qué dropdown está abierto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/team');
      setTeamMembers(response.data);
    } catch (err) {
      showErrorToast('No se pudieron cargar los miembros del equipo.', 'Error de Conexión');
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMemberToDelete(null);
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      // Asumiendo que la URL correcta es /api/team/:id
      await axios.delete(`http://localhost:3001/api/team/${memberToDelete.id}`);
      // Actualizar el estado para reflejar la eliminación
      setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== memberToDelete.id));
      showSuccessToast('El miembro del equipo ha sido eliminado.', 'Eliminación Exitosa');
      handleCloseModal();
    } catch (err) {
      showErrorToast('No se pudo eliminar el miembro del equipo.', 'Error de Conexión');
      console.error('Error deleting team member:', err);
      handleCloseModal();
    }
  };

  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleName = (role) => {
    const roles = {
      'psicologo': 'Psicólogo',
      'psicopedagogo': 'Psicopedagogo',
      'terapeuta': 'Terapeuta Ocupacional',
      'administrador': 'Administrador'
    };
    return roles[role] || role;
  };

  if (loading) {
    return (
      <AdminPanel>
        <div className="view-container">
          <div className="view-header">
            <h1 className="admin-title">Miembros del Equipo</h1>
            <div className="view-actions">
              <button className="btn btn-primary" disabled>+ Agregar Miembro</button>
            </div>
          </div>
          <SkeletonLoader />
        </div>
      </AdminPanel>
    );
  }

  return (
    <>
      <AdminPanel>
        <div className="view-container">
          <div className="view-header">
            <h1 className="admin-title">Miembros del Equipo</h1>
            <div className="view-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/team/members/new')}
              >
                <FiPlus /> Agregar Miembro
              </button>
            </div>
          </div>

          <div className="view-toolbar">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Miembro</th>
                  <th>Rol</th>
                  <th>Contacto</th>
                  <th>Experiencia</th>
                  <th>Calificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="member-cell">
                          <img 
                            src={member.avatar || '/default-avatar.png'} 
                            alt={member.name} 
                            className="avatar" 
                          />
                          <div className="member-details">
                            <span className="member-name">{member.name} {member.lastName}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="member-role">{getRoleName(member.role)}</div>
                      </td>
                      <td className="cell contact">
                        <span>{member.email}</span>
                        {member.phone && <span className="phone">{member.phone}</span>}
                      </td>
                      <td>
                        {member.experience ? `${member.experience} años` : 'N/A'}
                      </td>
                      <td>
                        <div className="cell rating">
                          <FiStar className="star-icon" />
                          <span>0.0</span>
                          <span className="review-count">(0 reseñas)</span>
                        </div>
                      </td>
                      <td>
                        <div className="actions-dropdown">
                          <button 
                            className="actions-btn" 
                            onClick={() => toggleDropdown(member.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {showDropdown === member.id && (
                            <div className="dropdown-menu">
                              <button className="dropdown-item" onClick={() => navigate(`/team/members/edit/${member.id}`)}>
                                <FiEdit2 /> Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(member)} 
                                className="dropdown-item dropdown-item-delete"
                              >
                                <FiTrash2 /> Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <FiUsers className="empty-state-icon" />
                      <h3>No se encontraron miembros</h3>
                      <p>Parece que aún no has agregado ningún miembro al equipo.</p>
                      <button className="btn btn-primary" onClick={() => navigate('/team/members/new')}>
                        Agregar Miembro
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPanel>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${memberToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />
    </>
  );
};

export default TeamMembersView;
