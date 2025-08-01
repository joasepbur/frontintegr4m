import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Crear el contexto
export const AuthContext = createContext(null);

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, user: null });

  // Efecto para restaurar la sesión desde localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        const decodedToken = jwtDecode(token);
        
        // Comprobar si el token ha expirado
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthState({ token, user });
        } else {
          // Si el token ha expirado, limpiamos el storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error al restaurar la sesión:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Función para iniciar sesión: recibe token y datos del usuario
  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({ token, user });
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null });
    // Redirigir al usuario a la página de login para una sesión limpia
    window.location.href = '/login';
  };

  // El valor que proveeremos a los componentes hijos
  const value = {
    authState,
    isLoggedIn: !!authState.token,
    isAdmin: authState.user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
