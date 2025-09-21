/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from 'react';

/**
 * Componente Logo (Integrado y en color morado)
 * Renderiza el logo SVG directamente en el componente con el color correcto.
 */
const Logo = () => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 sm:h-10 sm:w-10"
  >
    <defs>
      {/* Se ha actualizado el gradiente a tonos morados/índigo */}
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6D28D9', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#logoGradient)"
      d="M12 2L4.5 6.5v9L12 20l7.5-4.5v-9L12 2zm0 2.311L17.545 8.5v5l-5.545 3.188L6.455 13.5v-5L12 4.311zM12 9.5l-4 2.25v1.5l4 2.25 4-2.25v-1.5L12 9.5z"
    />
  </svg>
);

/**
 * Componente Header
 * Muestra la cabecera principal de la aplicación.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onMenuClick - Función para abrir el menú en dispositivos móviles.
 * @returns {JSX.Element} El componente de la cabecera.
 */
const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-emerald-600 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <span className="ml-3 text-2xl font-bold text-white tracking-wider">
              Gestor Pro
            </span>
          </div>
          <div className="md:hidden">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-700 focus:outline-none"
              aria-label="Abrir menú principal"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
