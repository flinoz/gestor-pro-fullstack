/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from "react";

/**
 * Componente Spinner
 * Muestra una animación de carga y un texto opcional.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.text='Cargando...'] - El texto a mostrar debajo del spinner.
 * @param {string} [props.size='md'] - El tamaño del spinner ('sm', 'md', 'lg').
 * @returns {JSX.Element} El componente de spinner.
 */
const Spinner = ({ text = "Cargando...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col justify-center items-center h-full my-10">
      <svg
        className={`animate-spin text-indigo-600 ${sizeClasses[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text && <p className="mt-4 text-sm font-medium text-gray-600">{text}</p>}
    </div>
  );
};

export default Spinner;
