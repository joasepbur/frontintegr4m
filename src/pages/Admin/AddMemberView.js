import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import './AddMemberView.css';

const AddMemberView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    specialty: '',
    description: '',
    experience: '',
    education: '',
    certifications: '',
    avatar: null,
    avatarPreview: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchMemberData();
    }
  }, [id]);

  const fetchMemberData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/team/${id}`);
      const member = response.data;
      
      setFormData({
        name: member.name || '',
        lastName: member.lastName || '',
        email: member.email || '',
        phone: member.phone || '',
        role: member.role || '',
        specialty: member.specialty || '',
        description: member.description || '',
        experience: member.experience || '',
        education: member.education || '',
        certifications: member.certifications || '',
        avatar: null,
        avatarPreview: member.avatar || null
      });
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.role) {
      newErrors.role = 'El rol es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'avatarPreview') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/team/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:3001/api/team', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      navigate('/admin/team');
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error al guardar el miembro. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/team');
  };

  return (
    <AdminPanel>
      <div className="edit-member-main-content">
        <div className="edit-member-header">
          <h1 className="admin-title">{isEditing ? 'Editar Miembro' : 'Agregar Nuevo Miembro'}</h1>
          <div className="header-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Información del Perfil</h2>
              <p className="admin-card-subtitle">Detalles básicos del miembro del equipo</p>
            </div>
            
            <div className="profile-main">
              {/* Avatar */}
              <div className="profile-avatar">
                <img 
                  src={formData.avatarPreview || '/default-avatar.png'} 
                  alt="Avatar" 
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="btn" style={{ marginTop: '1rem', cursor: 'pointer' }}>
                  Cambiar Foto
                </label>
              </div>
              
              {/* Profile Fields */}
              <div className="profile-fields">
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Apellido *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="role">Rol *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={errors.role ? 'error' : ''}
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="psicologo">Psicólogo</option>
                    <option value="psicopedagogo">Psicopedagogo</option>
                    <option value="terapeuta">Terapeuta Ocupacional</option>
                    <option value="administrador">Administrador</option>
                  </select>
                  {errors.role && <span className="error-message">{errors.role}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Work Information Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Información Profesional</h2>
              <p className="admin-card-subtitle">Detalles sobre la especialidad y experiencia</p>
            </div>
            
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="specialty">Especialidad</label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">Experiencia (años)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del profesional..."
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="education">Educación</label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Formación académica..."
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="certifications">Certificaciones</label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="Certificaciones relevantes..."
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminPanel>
  );
};

export default AddMemberView;
