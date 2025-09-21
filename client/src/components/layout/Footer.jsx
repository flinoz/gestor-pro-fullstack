/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from "react";

/**
 * Componente Footer
 * Muestra el pie de página de la aplicación.
 * @returns {JSX.Element} El componente del pie de página.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-600">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-emerald-100">
          &copy; {currentYear} ❤️ Gestor Pro | Impulsando el éxito de tus proyectos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
