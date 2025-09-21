/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React from "react";
import Button from "../common/Button";

/**
 * Componente ProjectItem
 * Muestra una tarjeta individual para un proyecto con sus acciones.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.project - El objeto del proyecto a mostrar (incluye id, name, description).
 * @param {function} props.onEdit - Función a llamar al hacer clic en el botón de editar.
 * @param {function} props.onDelete - Función a llamar al hacer clic en el botón de eliminar.
 * @returns {JSX.Element|null} La tarjeta de un proyecto, o null si no hay datos.
 */
const ProjectItem = ({ project, onEdit, onDelete }) => {
  // Salvaguarda: Si no se proporciona un objeto de proyecto, no se renderiza nada
  // para evitar errores en tiempo de ejecución.
  if (!project) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col animate-fade-in-up">
      {/* Sección de contenido principal de la tarjeta */}
      <div className="p-5 flex-grow">
        <h3
          className="text-lg font-bold text-gray-800 mb-2 truncate"
          title={project.name}
        >
          {project.name}
        </h3>
        <p
          className="text-gray-600 text-sm line-clamp-3"
          title={project.description}
        >
          {project.description || "Este proyecto no tiene descripción."}
        </p>
      </div>

      {/* Pie de la tarjeta con los botones de acción */}
      <div className="bg-gray-50 p-3 flex justify-end space-x-3 border-t border-gray-200">
        <Button onClick={onEdit} variant="secondary" size="sm">
          Editar
        </Button>
        <Button onClick={onDelete} variant="danger-outline" size="sm">
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProjectItem;