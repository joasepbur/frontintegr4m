import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './Home.css';

// Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminLayoutNew from './components/Admin/AdminLayoutNew';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import Login from './pages/Login';
import Register from './pages/Register';

import TeamMembersView from './pages/Admin/TeamMembersView';
import ScheduleView from './pages/Admin/ScheduleView';
import ClientList from './pages/Admin/ClientList';
import ServiceList from './pages/Admin/ServiceList';
import CalendarView from './pages/Calendar/CalendarView';
import EditMemberView from './pages/Admin/EditMemberView';
import AddMemberForm from './pages/Admin/AddMemberForm';
import Dashboard from './pages/Admin/Dashboard';

// Home Page Section Components
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import BusinessInfo from './components/BusinessInfo/BusinessInfo';
import Collaborators from './components/Collaborators/Collaborators';
import ServicesPage from './pages/Services';
import SelectCollaborator from './pages/SelectCollaborator';
import SelectDate from './pages/SelectDate';
import ConfirmBooking from './pages/ConfirmBooking';
import MyAppointments from './pages/MyAppointments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the HomePage component that aggregates all its sections
const HomePage = () => (
  <main>
    <Hero />
    <Services />
    <Collaborators />
    <BusinessInfo />
  </main>
);

const AppContent = () => {
  const location = useLocation();
  const noFooterPaths = ['/admin', '/clients', '/services', '/calendar', '/team'];
  const showFooter = !noFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App home-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<ServicesPage />} />
        <Route path="/booking/select-collaborator" element={<SelectCollaborator />} />
        <Route path="/booking/select-date" element={<SelectDate />} />
        <Route path="/booking/confirm" element={<ConfirmBooking />} />
        <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
        
        {/* Rutas de administración */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <Dashboard />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/team/members" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <TeamMembersView />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/team/members/new" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <AddMemberForm />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/team/schedule" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <ScheduleView />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/team/members/edit/:memberId" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <EditMemberView />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/calendar" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <CalendarView />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/clients" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <ClientList />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/services" element={<Navigate to="/services/menu" replace />} />
          
          <Route path="/services/menu" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <ServiceList />
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/services/memberships" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <div>Página de Membresías</div>
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/services/products" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <div>Página de Productos</div>
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/inventory/list" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <div>Página de Inventarios</div>
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/inventory/stock-orders" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <div>Página de Pedidos de stock</div>
              </AdminLayoutNew>
            </div>
          } />
          
          <Route path="/inventory/suppliers" element={
            <div className="flex min-h-screen bg-gray-50">
              <AdminPanel />
              <AdminLayoutNew>
                <div>Página de Proveedores</div>
              </AdminLayoutNew>
            </div>
          } />
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
