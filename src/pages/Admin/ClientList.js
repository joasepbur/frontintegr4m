import React, { useState, useEffect } from 'react';

import './ClientList.css';
import { FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No estás autenticado.');
          setLoading(false);
          return;
        }

            const response = await fetch('https://integramentehwh.com/backend/clients_manager.php', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al cargar los clientes.');
        }
        setClients(data);
      } catch (err) {
        setError('Error al cargar los clientes. ' + (err.response?.data?.message || err.message));
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options).replace('.', '');
  };

  return (
    <div className="client-list-container">
      <div className="client-list-header">
        <div>
          <h1>Lista de clientes</h1>
          <p>Ver, anadir, editar y eliminar informacion del cliente.</p>
        </div>
        <div className="client-list-actions">
          <button className="options-button">Opciones</button>
          <button className="add-button">
            <FaPlus /> Añadir
          </button>
        </div>
      </div>
      <div className="client-list-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Nombre, correo electrónico o ID" />
        </div>
        <button className="filter-button"><FaFilter /> Filtros</button>
      </div>

      {loading && <p>Cargando clientes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="client-list-table-container">
            <table className="client-list-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Nombre del cliente</th>
                  <th>Ventas</th>
                  <th>Creado el</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div className="client-info">
                        <div className="client-avatar">{client.nombre ? client.nombre.charAt(0) : ''}</div>
                        <div>
                          <div>{`${client.nombre || ''} ${client.apellido || ''}`}</div>
                          <div className="client-email">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>0 CLP</td>
                    <td>{formatDate(client.creado_el)}</td>
                    <td>{client.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="client-list-footer">
            <span>{`Visualización de resultados 1-${clients.length} de ${clients.length}`}</span>
            <div className="pagination">
              <button disabled>Anterior</button>
              <button disabled>Siguiente</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientList;
