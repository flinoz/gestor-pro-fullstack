/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React, { useEffect } from "react";

/**
 * Componente Modal
 * Muestra un cuadro de diálogo modal genérico sobre el contenido de la página.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.title - El título que se mostrará en la cabecera del modal.
 * @param {function} props.onClose - Función a llamar cuando el modal debe cerrarse.
 * @param {React.ReactNode} props.children - Los elementos hijos que se renderizarán dentro del modal.
 * @returns {JSX.Element|null} El componente modal o null si no está abierto.
 */
const Modal = ({ title, onClose, children }) => {
  // Efecto para deshabilitar el scroll del cuerpo de la página cuando el modal está abierto.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Función de limpieza para restaurar el scroll cuando el componente se desmonte.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Efecto para manejar el cierre del modal al presionar la tecla 'Escape'.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  /**
   * Maneja el clic en el fondo del modal para cerrarlo.
   * Solo se cierra si se hace clic directamente en el fondo y no en el contenido.
   * @param {React.MouseEvent<HTMLDivElement>} e - El evento del clic.
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start sm:items-center p-2 sm:p-4 animate-fade-in overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-auto my-4 sm:my-0 transform animate-scale-in">
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            {/* Icono de 'X' para cerrar */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Contenido del Modal (hijos) */}
        <div className="max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
