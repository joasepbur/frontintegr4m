import React from 'react';
import './AuthModal.css';
import { FaTimes, FaFacebook, FaGoogle } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Iniciar sesión o registrarse</h2>
        <p>Inicia sesión o regístrate para completar tu reserva</p>
        
        <button className="social-login-button">
          <FaFacebook className="facebook-icon" />
          Continuar con Facebook
        </button>
        
        <button className="social-login-button">
          <FaGoogle className="google-icon" />
          Continuar con Google
        </button>

        <div className="divider">o</div>

        <input type="email" placeholder="Email" className="email-input" />

        <button className="continue-button-auth">
          Continuar
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
