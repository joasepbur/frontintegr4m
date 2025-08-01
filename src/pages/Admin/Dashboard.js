import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import AdminPanel from './AdminPanel';
import './Dashboard.css';

const Dashboard = () => {
  // Datos de ejemplo para las tarjetas de estadísticas
  const stats = [
    { title: 'Total Miembros', value: '12', icon: <FiUsers />, color: 'blue' },
    { title: 'Citas Hoy', value: '8', icon: <FiCalendar />, color: 'green' },
    { title: 'Ingresos Mensuales', value: '$4,200', icon: <FiDollarSign />, color: 'purple' },
    { title: 'Sesiones Esta Semana', value: '24', icon: <FiBarChart2 />, color: 'orange' }
  ];

  // Datos de ejemplo para la tabla de próximas citas
  const upcomingAppointments = [
    { id: 1, client: 'María González', service: 'Terapia Individual', time: '10:00 AM', professional: 'Dra. Ana Martínez' },
    { id: 2, client: 'Carlos López', service: 'Psicopedagogía', time: '11:30 AM', professional: 'Lic. Juan Pérez' },
    { id: 3, client: 'Laura Rodríguez', service: 'Terapia de Pareja', time: '2:00 PM', professional: 'Dra. Ana Martínez' },
    { id: 4, client: 'Roberto Sánchez', service: 'Terapia Ocupacional', time: '3:30 PM', professional: 'Lic. Elena Torres' }
  ];

  return (
    <AdminPanel>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Resumen de actividad y estadísticas</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-card--${stat.color}`}>
              <div className="stat-card-icon">{stat.icon}</div>
              <div className="stat-card-content">
                <h3 className="stat-card-title">{stat.title}</h3>
                <p className="stat-card-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfica de ejemplo */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Actividad Reciente</h2>
            <p className="admin-card-subtitle">Resumen de citas y sesiones</p>
          </div>
          <div className="chart-placeholder">
            <div className="chart-placeholder-content">
              <FiBarChart2 size={48} />
              <p>Gráfica de actividad (implementación pendiente)</p>
            </div>
          </div>
        </div>

        {/* Tabla de próximas citas */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Próximas Citas</h2>
            <p className="admin-card-subtitle">Citas programadas para hoy</p>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Hora</th>
                  <th>Profesional</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.client}</td>
                    <td>{appointment.service}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.professional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
};

export default Dashboard;
