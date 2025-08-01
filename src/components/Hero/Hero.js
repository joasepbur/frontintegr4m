import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown, BsEmojiDizzy } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-[90%] max-w-7xl mx-auto py-16">
      {/* Contenido principal: Título e imagen central */}
      <div className="flex-1 min-w-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">IntegraMenteHwh</h1>
        <p className="text-blue-800 text-lg mb-8 flex items-center gap-2">
          <IoLocationOutline className="text-xl" /> Mac Iver 1664, Concepción
        </p>
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://integramentehwh.com/img/banner-integramente.webp" 
            alt="IntegraMenteHwh"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Sidebar */}
      <aside className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-28">
        {/* Tarjeta de información */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">IntegraMenteHwh</h2>
          
          <div className="flex items-center gap-3 my-4">
            <span className="text-lg font-semibold text-gray-900">5.0</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5" />
              ))}
            </div>
            <span className="text-gray-500">(1)</span>
          </div>
          
          <p className="text-gray-700 mb-6"><strong>Abierto</strong> hasta las 22:00</p>
          
          <Link 
            to="/booking" 
            className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 mb-4"
          >
            Reservar ahora <FiArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="text-gray-600 text-sm flex items-center gap-2 mb-2">
            <IoLocationOutline className="text-gray-500" /> Mac Iver 1664, Concepción, Bío Bío
          </p>
          
          <a 
            href="#" 
            className="text-blue-800 font-semibold text-sm hover:underline"
          >
            Cómo llegar
          </a>
        </div>
        
        {/* Tarjeta de estado de ánimo */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-center text-gray-900 mb-6">
            ¿Cómo te sientes hoy?
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-800 transition-colors">
              <BsEmojiSmile className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-medium">Feliz</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-800 transition-colors">
              <BsEmojiNeutral className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-medium">Neutral</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-800 transition-colors">
              <BsEmojiFrown className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-medium">Triste</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-800 transition-colors">
              <BsEmojiDizzy className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-medium">Ansioso</span>
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Hero;
