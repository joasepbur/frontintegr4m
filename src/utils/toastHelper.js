import React from 'react';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

// Estilos y configuración comunes para los toasts
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Componente personalizado para el contenido del toast
const ToastContent = ({ icon, title, message }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ fontSize: '1.5rem', marginRight: '12px' }}>{icon}</div>
    <div>
      <div style={{ fontWeight: 'bold' }}>{title}</div>
      <div>{message}</div>
    </div>
  </div>
);

/**
 * Muestra una notificación de éxito.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [title='Éxito'] - El título de la notificación.
 */
export const showSuccessToast = (message, title = 'Éxito') => {
  toast.success(
    <ToastContent 
      icon={<FiCheckCircle style={{ color: '#4caf50' }} />} 
      title={title} 
      message={message} 
    />, 
    toastConfig
  );
};

/**
 * Muestra una notificación de error.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [title='Error'] - El título de la notificación.
 */
export const showErrorToast = (message, title = 'Error') => {
  toast.error(
    <ToastContent 
      icon={<FiXCircle style={{ color: '#f44336' }} />} 
      title={title} 
      message={message} 
    />, 
    toastConfig
  );
};

/**
 * Muestra una notificación de información.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [title='Información'] - El título de la notificación.
 */
export const showInfoToast = (message, title = 'Información') => {
  toast.info(
    <ToastContent 
      icon={<FiInfo style={{ color: '#2196f3' }} />} 
      title={title} 
      message={message} 
    />, 
    toastConfig
  );
};

/**
 * Muestra una notificación de advertencia.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [title='Advertencia'] - El título de la notificación.
 */
export const showWarningToast = (message, title = 'Advertencia') => {
  toast.warn(
    <ToastContent 
      icon={<FiAlertTriangle style={{ color: '#ff9800' }} />} 
      title={title} 
      message={message} 
    />, 
    toastConfig
  );
};
