import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiGrid, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isLoggedIn, user, isAdmin, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src="https://integramentehwh.com/img/logo-blanco.webp" alt="IntegramenteHwh Logo" className="logo-img" />
          <span className="logo-title">IntegraMenteHwh</span>
        </Link>
        
        <div className="auth-buttons">
          {!isLoggedIn ? (
            // Vista para usuarios no logueados
            <>
              <Link to="/login" className="btn-login"><FiLogIn /> Iniciar sesión</Link>
              <Link to="/register" className="btn-register"><FiUserPlus /> Registrarse</Link>
            </>
          ) : (
            // Vista para usuarios logueados
            <div className="user-section">
              {isAdmin ? (
                // Vista para administradores
                <div className="dropdown">
                  <div onClick={() => setMenuOpen(!menuOpen)} className="dropdown-toggle">
                    <span className="dropdown-user">MENU</span>
                    <div className="hamburger-icon">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  {menuOpen && (
                    <div className="dropdown-menu">
                      <Link to="/team/members" className="dropdown-item" onClick={() => setMenuOpen(false)}><FiGrid /> Panel de Admin</Link>
                      <button onClick={handleLogout} className="dropdown-item-btn"><FiLogOut /> Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                // Vista para usuarios normales
                <>
                  <span className="welcome-user">Hola, {user.name}</span>
                  <button onClick={handleLogout} className="btn-logout"><FiLogOut /> Cerrar Sesión</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
