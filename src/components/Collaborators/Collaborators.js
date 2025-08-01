import React from 'react';
import './Collaborators.css';

const collaboratorsData = [
  {
    name: 'Nicolás Pinilla Burgos',
    role: 'Psicólogo',
    imageUrl: 'https://integramentehwh.com/img/nicolaspinilla.webp'
  },
  {
    name: 'Cristian A. Gross',
    role: 'Psicólogo',
    imageUrl: 'https://integramentehwh.com/img/cristiangross.webp'
  },
  {
    name: 'Rocío Almendras Reyes',
    role: 'Psicóloga',
    imageUrl: 'https://integramentehwh.com/img/rocioalmendras.webp'
  },
  {
    name: 'Vanessa Hidalgo Sanhueza',
    role: 'Psicopedagoga',
    imageUrl: 'https://integramentehwh.com/img/vanessahidalgo.webp'
  },
  {
    name: 'Katherine Vidal González',
    role: 'Terapeuta Ocupacional',
    imageUrl: 'https://integramentehwh.com/img/katherinevidal.webp'
  },
];

const getRoleClass = (role) => {
  if (role.toLowerCase().includes('psic')) {
    return 'role-psych';
  } else if (role.toLowerCase().includes('terapeuta')) {
    return 'role-therapist';
  }
  return '';
};

const Collaborators = () => {
  return (
    <section className="collaborators">
      <h2 className="section-title">Equipo HwH</h2>
      <div className="collaborators-grid">
        {collaboratorsData.map((collab, index) => (
          <div className="collaborator-card" key={index}>
                        <div className="collaborator-image">
              <img src={collab.imageUrl} alt={`Foto de ${collab.name}`} />
            </div>
            <div className="collaborator-info">
              <h3>{collab.name}</h3>
              <p className={`collaborator-role ${getRoleClass(collab.role)}`}>{collab.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collaborators;
