import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import { showSuccessToast, showErrorToast } from '../../utils/toastHelper';
import { FiSave, FiX, FiInfo } from 'react-icons/fi';
import Tooltip from '../../components/Admin/Tooltip';
import './AddMemberView.css'; // Reutilizamos los estilos existentes

const AddMemberForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    experience: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string().email('Formato de email inválido').required('El email es obligatorio'),
    phone: Yup.string().matches(/^[0-9]+$/, "El teléfono solo debe contener números").min(8, 'El teléfono debe tener al menos 8 dígitos').optional(),
    role: Yup.string().required('El rol es obligatorio'),
    experience: Yup.number().min(0, 'La experiencia no puede ser negativa').required('La experiencia es obligatoria'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:3001/api/team', values);
      showSuccessToast('Miembro agregado con éxito');
      resetForm();
      navigate('/admin/team-members');
    } catch (error) {
      showErrorToast('Error al agregar el miembro. Por favor, inténtalo de nuevo.');
      console.error('Error creating team member:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminPanel>
      <div className="view-container">
        <div className="view-header">
          <h1 className="admin-title">Agregar Nuevo Miembro</h1>
        </div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre <Tooltip text="El nombre principal del miembro del equipo."><FiInfo className="info-icon" /></Tooltip></label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Apellido <Tooltip text="El apellido o apellidos del miembro del equipo."><FiInfo className="info-icon" /></Tooltip></label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage name="lastName" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email <Tooltip text="La dirección de correo electrónico para el inicio de sesión y contacto."><FiInfo className="info-icon" /></Tooltip></label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono (Opcional) <Tooltip text="Un número de contacto adicional para el miembro."><FiInfo className="info-icon" /></Tooltip></label>
                  <Field type="text" id="phone" name="phone" />
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="role">Rol <Tooltip text="Define los permisos y el nivel de acceso del usuario en el sistema."><FiInfo className="info-icon" /></Tooltip></label>
                    <Field as="select" id="role" name="role">
                      <option value="" label="Selecciona un rol" />
                      <option value="psicologo" label="Psicólogo" />
                      <option value="terapeuta" label="Terapeuta" />
                      <option value="admin" label="Administrador" />
                      <option value="asistente" label="Asistente" />
                    </Field>
                    <ErrorMessage name="role" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Años de Experiencia <Tooltip text="Número de años de experiencia profesional relevante."><FiInfo className="info-icon" /></Tooltip></label>
                    <Field type="number" id="experience" name="experience" />
                    <ErrorMessage name="experience" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => navigate('/admin/team-members')}
                    disabled={isSubmitting}
                  >
                    <FiX /> Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    <FiSave /> {isSubmitting ? 'Guardando...' : 'Guardar Miembro'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminPanel>
  );
};

export default AddMemberForm;
