import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ rows = 5 }) => {
  const renderRows = () => {
    let tableRows = [];
    for (let i = 0; i < rows; i++) {
      tableRows.push(
        <tr key={i}>
          <td><div className="skeleton skeleton-cell skeleton-avatar"></div></td>
          <td><div className="skeleton skeleton-cell"></div></td>
          <td><div className="skeleton skeleton-cell"></div></td>
          <td><div className="skeleton skeleton-cell"></div></td>
          <td><div className="skeleton skeleton-cell"></div></td>
          <td><div className="skeleton skeleton-cell"></div></td>
        </tr>
      );
    }
    return tableRows;
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Miembro</th>
            <th>Rol</th>
            <th>Contacto</th>
            <th>Experiencia</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonLoader;
