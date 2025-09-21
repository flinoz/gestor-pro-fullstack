/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React from "react";
import Button from "../common/Button";

/**
 * Componente TaskItem
 * Muestra una tarjeta individual para una tarea con sus acciones.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.task - El objeto de la tarea a mostrar.
 * @param {function} props.onEdit - Función a llamar al hacer clic en el botón de editar.
 * @param {function} props.onDelete - Función a llamar al hacer clic en el botón de eliminar.
 * @returns {JSX.Element|null} La tarjeta de una tarea, o null si no hay datos.
 */
const TaskItem = ({ task, onEdit, onDelete }) => {
  if (!task) return null;
  
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-md font-bold text-gray-800 pr-2" title={task.title}>
            {task.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusStyles[task.status] || 'bg-gray-100'}`}>
            {task.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2" title={task.description}>
          {task.description || 'Sin descripción.'}
        </p>
        <div className="text-xs text-gray-500 space-y-1 border-t pt-2 mt-2">
          <p><strong>Proyecto:</strong> {task.project_name || 'N/A'}</p>
          <p><strong>Asignado a:</strong> {task.assigned_to_name || 'Sin asignar'}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-3 flex justify-end space-x-3 border-t">
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

export default TaskItem;

