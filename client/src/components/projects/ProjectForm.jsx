/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React, { useState, useEffect } from "react";
import Button from "../common/Button";

/**
 * Componente ProjectForm
 * Renderiza un formulario para crear o editar un proyecto.
 * @param {object} props - Propiedades del componente.
 * @param {object|null} props.project - El proyecto a editar, o null si se está creando uno nuevo.
 * @param {function} props.onSave - Función a llamar para guardar el proyecto.
 * @param {function} props.onCancel - Función a llamar para cancelar la operación.
 * @returns {JSX.Element} El formulario del proyecto.
 */
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Efecto para precargar los datos del formulario si se está editando un proyecto existente.
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
      });
    }
  }, [project]);

  /**
   * Maneja los cambios en los campos del formulario y actualiza el estado.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Maneja el envío del formulario, valida los datos y llama a onSave.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("El nombre del proyecto es obligatorio.");
      return;
    }
    setError("");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Campo para el nombre del proyecto */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre del Proyecto
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          placeholder="Ej: Desarrollo de la App Móvil"
          required
        />
      </div>

      {/* Campo para la descripción del proyecto */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          placeholder="Describe brevemente el objetivo del proyecto"
        ></textarea>
      </div>

      {/* Mensaje de error de validación */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 pt-2">
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
