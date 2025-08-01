import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaArrowLeft, FaTimes, FaPlus, FaClinicMedical, FaTag, FaArrowRight, FaPlusCircle } from 'react-icons/fa';

// Mock category descriptions as they are not available from the API
const categoryDescriptions = {
  PSICOTERAPIA: 'Psicoterapia basada en enfoques científicos para promover el bienestar emocional, fortalecer recursos personales y abordar dificultades psicológicas. Sesiones adaptadas a cada persona para un proceso de cambio y crecimiento significativo.',
  PSICOPEDAGOGÍA: 'En IntegraMente, ofrecemos un servicio psicopedagógico especializado destinado a apoyar el desarrollo integral de niños, niñas y adolescentes que enfrentan desafíos en su proceso de aprendizaje, así como adultos que necesitan una orientación.',
  'TERAPIA OCUPACIONAL': 'Servicio de Terapia Ocupacional enfocado en mejorar la autonomía y calidad de vida de las personas a través de actividades terapéuticas con propósito.',
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' means show all categories
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/public/services');
        const data = response.data;

        // Filtrar servicios que no deben aparecer en booking para usuarios finales
        const filteredServices = data.filter((service) => {
          // Excluir cursos y talleres
          if (service.categoria === 'Cursos y Talleres') return false;
          
          // Excluir servicios de arriendo de box/salon
          if (service.nombre && service.nombre.toLowerCase().includes('arriendo')) return false;
          if (service.nombre && service.nombre.toLowerCase().includes('box')) return false;
          if (service.nombre && service.nombre.toLowerCase().includes('salon')) return false;
          if (service.categoria && service.categoria.toLowerCase().includes('arriendo')) return false;
          
          return true;
        });
        setServices(filteredServices);

        // No set a default active category, keep it as 'ALL' to show all services initially
      } catch (err) {
        setError('No se pudieron cargar los servicios. Por favor, intente más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const servicesByCategory = useMemo(() => {
    return services.reduce((acc, service) => {
      const { categoria } = service;
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(service);
      return acc;
    }, {});
  }, [services]);

  const desiredOrder = ['PSICOTERAPIA', 'TERAPIA OCUPACIONAL', 'PSICOPEDAGOGÍA'];
  const categories = Object.keys(servicesByCategory).sort((a, b) => {
    const indexA = desiredOrder.indexOf(a);
    const indexB = desiredOrder.indexOf(b);
    if (indexA === -1) return 1; // a is not in the desired order
    if (indexB === -1) return -1; // b is not in the desired order
    return indexA - indexB;
  });

  const handleSelectService = (service) => {
    setSelectedServices(prev => {
      // For this design, allow only one service to be selected
      return [service];
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = useMemo(() => {
    return selectedServices.reduce((acc, service) => acc + service.precio, 0);
  }, [selectedServices]);

  const handleContinue = useCallback(() => {
    if (selectedServices.length > 0) {
      navigate('/booking/select-collaborator', {
        state: { 
          services: selectedServices,
          total: total
        }
      });
    }
  }, [navigate, selectedServices, total]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          Cargando...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button className="p-2 rounded-lg bg-gray-50 text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-200">
            <FaArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <span className="font-semibold text-blue-800">Servicios</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500">Profesional</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500">Hora</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500">Confirmar</span>
          </div>
          
          <button className="p-2 rounded-lg bg-gray-50 text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-200">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Servicios</h1>
            
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-gray-50 rounded-lg border border-gray-200">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === 'ALL' 
                    ? 'bg-blue-800 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory('ALL')}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === cat
                      ? 'bg-blue-800 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {(activeCategory === 'ALL' ? categories : [activeCategory]).map(cat => (
                <div key={cat} id={cat.toLowerCase().replace(/ /g, '-')} className="scroll-mt-16">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 relative pl-3 border-l-4 border-teal-400">
                      {cat}
                    </h2>
                    <p className="mt-1 ml-3 text-gray-600 max-w-3xl leading-relaxed">
                      {categoryDescriptions[cat] || 'Descripción no disponible.'}
                    </p>
                  </div>
                  
                  <div className="space-y-3 ml-3">
                    {servicesByCategory[cat]?.map(service => (
                      <div 
                        key={service.id} 
                        className={`flex justify-between items-center p-4 rounded-lg border transition-all ${
                          selectedServices.some(s => s.id === service.id)
                            ? 'border-teal-300 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{service.nombre}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{service.duracion} min</span>
                            <span className="text-sm font-medium text-gray-900">
                              desde {formatPrice(service.precio)}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleSelectService(service)}
                          className={`p-2 rounded-lg transition-colors ${
                            selectedServices.some(s => s.id === service.id)
                              ? 'bg-blue-800 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <FaPlus className="w-4 h-4" />
                        </button>
                      </div>
                    )) || null}
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 text-blue-800 font-medium">
                  <FaClinicMedical className="w-5 h-5" />
                  <span>IntegraMente</span>
                </div>
              </div>

              <div className="p-4 min-h-40">
                {selectedServices.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-gray-500">
                    <FaPlus className="w-6 h-6 mb-2 text-gray-400" />
                    <span>Selecciona un servicio</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedServices.map(s => (
                      <div 
                        key={s.id} 
                        className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg text-teal-900"
                      >
                        <FaTag className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span className="text-sm font-medium flex-1">{s.nombre}</span>
                        <span className="text-sm font-semibold text-blue-800">
                          {formatPrice(s.precio)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4 font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <FaPlusCircle className="w-4 h-4 text-blue-800" />
                    <span>Total</span>
                  </div>
                  <span className="text-blue-800">{formatPrice(total)}</span>
                </div>
                
                <button 
                  className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    selectedServices.length > 0
                      ? 'bg-blue-800 text-white hover:bg-blue-900 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={selectedServices.length === 0}
                  onClick={handleContinue}
                  aria-label="Continuar"
                >
                  <span>Continuar</span>
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Services;
