/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from "react";

/**
 * Ítem de navegación individual para la barra lateral.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.href - La URL o identificador del enlace.
 * @param {boolean} props.isActive - Si el enlace está activo.
 * @param {function} props.onClick - Función a ejecutar al hacer clic.
 * @param {React.ReactNode} props.icon - El icono SVG para el enlace.
 * @param {string} props.children - El texto del enlace.
 */
const NavItem = ({ href, isActive, onClick, icon, children }) => {
  const activeClasses = "bg-emerald-700 text-white";
  const inactiveClasses =
    "text-emerald-100 hover:bg-emerald-600 hover:text-white";

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {icon}
      {children}
    </a>
  );
};

/**
 * Componente Sidebar
 * Muestra la barra de navegación lateral principal.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.currentView - La vista actualmente seleccionada.
 * @param {function} props.setCurrentView - Función para cambiar la vista actual.
 * @param {boolean} props.isMobileMenuOpen - Si el menú móvil está abierto.
 * @param {function} props.onCloseMobileMenu - Función para cerrar el menú móvil.
 * @returns {JSX.Element} El componente de la barra lateral.
 */
const Sidebar = ({
  currentView,
  setCurrentView,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const navigation = [
    {
      name: "Proyectos",
      view: "projects",
      icon: (
        <svg
          className="mr-3 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Tareas",
      view: "tasks",
      icon: (
        <svg
          className="mr-3 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      name: "Usuarios",
      view: "users",
      icon: (
        <svg
          className="mr-3 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197"
          />
        </svg>
      ),
    },
  ];

  const sidebarContent = (
    <div className="bg-emerald-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out flex flex-col z-30">
      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            href="#"
            isActive={currentView === item.view}
            onClick={() => {
              setCurrentView(item.view);
              onCloseMobileMenu(); // Cierra el menú en móvil al seleccionar una opción
            }}
            icon={item.icon}
          >
            {item.name}
          </NavItem>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Sidebar para pantallas grandes (siempre visible) */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">{sidebarContent}</div>
      </div>

      {/* Overlay y Sidebar para móviles */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          {/* Overlay oscuro */}
          <div
            className="fixed inset-0"
            aria-hidden="true"
            onClick={onCloseMobileMenu}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>

          {/* Contenido del Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
