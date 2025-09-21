/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React from "react";
import Button from "../common/Button";

/**
 * Componente UserItem
 * Muestra una tarjeta individual para un usuario con sus acciones.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.user - El objeto del usuario a mostrar.
 * @param {function} props.onEdit - Función a llamar al hacer clic en el botón de editar.
 * @param {function} props.onDelete - Función a llamar al hacer clic en el botón de eliminar.
 * @returns {JSX.Element|null} La tarjeta de un usuario, o null si no hay datos.
 */
const UserItem = ({ user, onEdit, onDelete }) => {
  if (!user) return null;
  
  const roleColors = {
    Admin: "bg-red-100 text-red-800",
    "Project Manager": "bg-blue-100 text-blue-800",
    Developer: "bg-green-100 text-green-800"
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col animate-fade-in-up">
      <div className="flex-grow">
        <div className="mx-auto bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-indigo-600">
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          </span>
        </div>
        <h3 className="font-bold text-gray-800 truncate" title={user.name}>
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 truncate" title={user.email}>
          {user.email}
        </p>
        <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role] || "bg-gray-100 text-gray-800"}`}>
          {user.role}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center space-x-2">
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

export default UserItem;

