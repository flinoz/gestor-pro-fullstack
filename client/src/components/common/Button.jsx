/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from 'react';

/**
 * Componente Button
 * Renderiza un botón personalizable con diferentes estilos y tamaños.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido del botón (texto, icono, etc.).
 * @param {function} props.onClick - Función a ejecutar cuando se hace clic en el botón.
 * @param {string} [props.type='button'] - El tipo de botón HTML ('button', 'submit', 'reset').
 * @param {string} [props.variant='primary'] - La variante de estilo del botón ('primary', 'secondary', 'danger', 'danger-outline').
 * @param {string} [props.size='md'] - El tamaño del botón ('sm', 'md', 'lg').
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado.
 * @param {string} [props.className=''] - Clases de CSS adicionales para personalizar.
 * @returns {JSX.Element} El componente de botón.
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  // --- Estilos base ---
  const baseStyles = 'inline-flex items-center justify-center font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out';

  // --- Estilos por variante (versión completa) ---
  const variantStyles = {
    primary: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
    'danger-outline': 'bg-white text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-500',
  };

  // --- Estilos por tamaño ---
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // --- Estilos para estado deshabilitado ---
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  // Combinamos todas las clases de estilo
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;