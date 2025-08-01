import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-about">
          <h3 className="footer-brand">IntegraMente HWH</h3>
          <p>Tu centro de bienestar y salud mental. Estamos para apoyarte en tu camino.</p>
        </div>
        <div className="footer-links">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/services">Servicios</Link>
          <Link to="/team">Equipo</Link>
          <Link to="/contact">Contacto</Link>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <Link to="/privacy">Política de Privacidad</Link>
          <Link to="/terms">Términos de Servicio</Link>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} Integramentehwh. Todos los derechos reservados.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
