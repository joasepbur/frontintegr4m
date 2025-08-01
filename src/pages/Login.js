import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Obtener la función de login del contexto

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    try {
          const response = await api.post('/auth/login', formData);
      // Axios considera una respuesta exitosa si el código de estado es 2xx.
      // La propiedad 'ok' no existe en la respuesta de Axios, a diferencia de fetch.
      // Simplemente verificamos si la respuesta contiene los datos esperados (el token).
      if (response.data && response.data.token) {
        login(response.data.token, response.data.user); // Guardamos el token y los datos del usuario en el contexto
        navigate('/', { replace: true }); // Redirigir al usuario
      } else {
        // Esto podría ocurrir si el servidor responde 200 OK pero sin un token.
        throw new Error(response.data.message || 'Respuesta inválida del servidor');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al conectar con el servidor. Inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Iniciar Sesión</button>
        </form>
        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
