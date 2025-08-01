import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/Admin/ConfirmModal';
import Card from '../../components/Admin/Card';
import Button from '../../components/Admin/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../../utils/toastHelper';
import SkeletonLoader from '../../components/Admin/SkeletonLoader';
import { 
  FiPlus, FiSearch, FiStar, FiMoreVertical, FiEdit2, FiTrash2, 
  FiUsers, FiMail, FiPhone, FiMapPin, FiCalendar 
} from 'react-icons/fi';

const TeamMembersView = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);
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
      await axios.delete(`http://localhost:3001/api/team/${memberToDelete.id}`);
      setTeamMembers(prev => prev.filter(member => member.id !== memberToDelete.id));
      showSuccessToast('Miembro del equipo eliminado correctamente.');
      handleCloseModal();
    } catch (err) {
      showErrorToast('Error al eliminar el miembro del equipo.');
      console.error('Error deleting team member:', err);
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    `${member.first_name} ${member.last_name} ${member.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getRoleLabel = (role) => {
    const roles = {
      'psychologist': 'Psicólogo/a',
      'psychiatrist': 'Psiquiatra',
      'therapist': 'Terapeuta',
      'counselor': 'Consejero/a',
      'admin': 'Administrador/a'
    };
    return roles[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      'psychologist': 'bg-primary-100 text-primary-800',
      'psychiatrist': 'bg-secondary-100 text-secondary-800',
      'therapist': 'bg-success-100 text-success-800',
      'counselor': 'bg-warning-100 text-warning-800',
      'admin': 'bg-neutral-100 text-neutral-800'
    };
    return colors[role] || 'bg-neutral-100 text-neutral-800';
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Miembros del Equipo</h1>
            <p className="text-neutral-600 mt-1">Gestiona los profesionales de tu centro</p>
          </div>
          <Button disabled leftIcon={<FiPlus />}>
            Agregar Miembro
          </Button>
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Miembros del Equipo</h1>
            <p className="text-neutral-600 mt-1">Gestiona los profesionales de tu centro</p>
          </div>
          <Button 
            onClick={() => navigate('/team/members/new')}
            leftIcon={<FiPlus />}
          >
            Agregar Miembro
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-primary-100">
                <FiUsers className="text-primary-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-800">{teamMembers.length}</p>
                <p className="text-neutral-600 font-medium">Total Miembros</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-success-100">
                <FiStar className="text-success-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-800">
                  {teamMembers.filter(m => m.role === 'psychologist').length}
                </p>
                <p className="text-neutral-600 font-medium">Psicólogos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-secondary-100">
                <FiCalendar className="text-secondary-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-800">
                  {teamMembers.filter(m => m.role === 'therapist').length}
                </p>
                <p className="text-neutral-600 font-medium">Terapeutas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-warning-100">
                <FiMapPin className="text-warning-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-800">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
                <p className="text-neutral-600 font-medium">Activos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card padding="default">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-neutral-600">
                {filteredMembers.length} de {teamMembers.length} miembros
              </span>
            </div>
          </div>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-card border border-neutral-200 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Member Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {getInitials(member.first_name, member.last_name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800">
                        {member.first_name} {member.last_name}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                        {getRoleLabel(member.role)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => setShowDropdown(showDropdown === member.id ? null : member.id)}
                    >
                      <FiMoreVertical />
                    </Button>
                    
                    {showDropdown === member.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-10">
                        <Link
                          to={`/team/members/edit/${member.id}`}
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-t-lg"
                          onClick={() => setShowDropdown(null)}
                        >
                          <FiEdit2 className="mr-2" />
                          Editar
                        </Link>
                        <button
                          onClick={() => {
                            handleDeleteClick(member);
                            setShowDropdown(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-error-600 hover:bg-error-50 rounded-b-lg"
                        >
                          <FiTrash2 className="mr-2" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Details */}
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <FiMail className="mr-2 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <FiPhone className="mr-2 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.specialization && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <FiStar className="mr-2 flex-shrink-0" />
                      <span className="truncate">{member.specialization}</span>
                    </div>
                  )}
                </div>

                {/* Member Actions */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === 'active' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {member.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                    <Link to={`/team/members/edit/${member.id}`}>
                      <Button variant="outline" size="small">
                        Ver perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <FiUsers className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-800 mb-2">
                No se encontraron miembros
              </h3>
              <p className="text-neutral-600 mb-4">
                {searchTerm 
                  ? 'No hay miembros que coincidan con tu búsqueda.'
                  : 'Aún no hay miembros en el equipo. Agrega el primer miembro.'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => navigate('/team/members/new')} leftIcon={<FiPlus />}>
                  Agregar Primer Miembro
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar Miembro del Equipo"
        message={`¿Estás seguro de que deseas eliminar a ${memberToDelete?.first_name} ${memberToDelete?.last_name}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
};

export default TeamMembersView;
