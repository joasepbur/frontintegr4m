import React from 'react';
import {
  FiUsers, FiCalendar, FiDollarSign, FiBarChart2,
  FiTrendingUp, FiClock, FiCheckCircle, FiAlertCircle,
  FiMoreVertical, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import MetricCard from '../../components/Admin/MetricCard';
import Card from '../../components/Admin/Card';
import Button from '../../components/Admin/Button';

const Dashboard = () => {
  // Datos de ejemplo para las tarjetas de estadísticas principales
  const mainStats = [
    {
      title: 'Miembros Activos',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: <FiUsers />,
      color: 'primary',
      description: 'Profesionales registrados'
    },
    {
      title: 'Citas Hoy',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: <FiCalendar />,
      color: 'secondary',
      description: 'Sesiones programadas'
    },
    {
      title: 'Ingresos del Mes',
      value: '$4,200',
      change: '+12%',
      changeType: 'positive',
      icon: <FiDollarSign />,
      color: 'success',
      description: 'Facturación mensual'
    },
    {
      title: 'Tasa de Asistencia',
      value: '94%',
      change: '-2%',
      changeType: 'negative',
      icon: <FiBarChart2 />,
      color: 'warning',
      description: 'Promedio semanal'
    }
  ];

  // Métricas secundarias
  const secondaryStats = [
    { title: 'Nuevos Pacientes', value: '5', icon: <FiTrendingUp />, color: 'text-primary-600' },
    { title: 'Horas de Trabajo', value: '42h', icon: <FiClock />, color: 'text-secondary-600' },
    { title: 'Casos Completados', value: '18', icon: <FiCheckCircle />, color: 'text-success-600' },
    { title: 'Seguimientos Pendientes', value: '3', icon: <FiAlertCircle />, color: 'text-warning-600' }
  ];

  // Datos de ejemplo para próximas citas
  const upcomingAppointments = [
    {
      id: 1,
      client: 'María González',
      service: 'Terapia Individual',
      time: '10:00',
      professional: 'Dra. Ana Martínez',
      status: 'confirmed',
      avatar: 'MG'
    },
    {
      id: 2,
      client: 'Carlos López',
      service: 'Psicopedagogía',
      time: '11:30',
      professional: 'Lic. Juan Pérez',
      status: 'pending',
      avatar: 'CL'
    },
    {
      id: 3,
      client: 'Laura Rodríguez',
      service: 'Terapia de Pareja',
      time: '14:00',
      professional: 'Dra. Ana Martínez',
      status: 'confirmed',
      avatar: 'LR'
    },
    {
      id: 4,
      client: 'Roberto Sánchez',
      service: 'Terapia Ocupacional',
      time: '15:30',
      professional: 'Lic. Elena Torres',
      status: 'confirmed',
      avatar: 'RS'
    }
  ];

  // Actividad reciente
  const recentActivity = [
    { type: 'appointment', message: 'Nueva cita programada con María González', time: '10 min', color: 'text-success-600' },
    { type: 'payment', message: 'Pago recibido de Carlos López - $150', time: '25 min', color: 'text-primary-600' },
    { type: 'update', message: 'Perfil actualizado - Dr. Ana Martínez', time: '1 hora', color: 'text-secondary-600' },
    { type: 'alert', message: 'Recordatorio: Seguimiento pendiente', time: '2 horas', color: 'text-warning-600' }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-success-100 text-success-700 border-success-200',
      pending: 'bg-warning-100 text-warning-700 border-warning-200',
      cancelled: 'bg-error-100 text-error-700 border-error-200'
    };

    const labels = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      cancelled: 'Cancelada'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con saludo y fecha */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">¡Buenos días, Administrador!</h1>
            <p className="text-primary-100 mt-1">
              Hoy es {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-100">Centro IntegraMente</p>
            <p className="text-xl font-semibold">8 citas programadas</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description={stat.description}
          />
        ))}
      </div>

      {/* Métricas secundarias */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card border border-neutral-200 p-4">
            <div className="flex items-center">
              <span className={`text-lg mr-3 ${stat.color}`}>{stat.icon}</span>
              <div>
                <p className="text-lg font-bold text-neutral-800">{stat.value}</p>
                <p className="text-sm text-neutral-600">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas citas */}
        <div className="lg:col-span-2">
          <Card
            title="Próximas Citas"
            subtitle="Sesiones programadas para hoy"
            action={
              <Button variant="ghost" size="small">
                <FiMoreVertical />
              </Button>
            }
          >

            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-4">
                    {appointment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-neutral-800">{appointment.client}</h4>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">{appointment.service}</p>
                    <p className="text-xs text-neutral-500">{appointment.professional}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800">{appointment.time}</p>
                    <p className="text-xs text-neutral-500">Hoy</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actividad reciente */}
        <div>
          <Card
            title="Actividad Reciente"
            action={
              <Button variant="ghost" size="small">
                Ver todo
              </Button>
            }
          >
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${activity.color.replace('text-', 'bg-')}`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-800 mb-1">{activity.message}</p>
                    <p className="text-xs text-neutral-500">{activity.time} atrás</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Gráfica de actividad semanal */}
          <Card title="Resumen Semanal" className="mt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Citas completadas</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-neutral-600">Ingresos objetivo</span>
                <span className="font-semibold">$4,200 / $5,000</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{width: '84%'}}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
