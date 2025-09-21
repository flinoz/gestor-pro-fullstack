/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React, { useState, useEffect } from "react";

// --- COMPONENTE BUTTON INTEGRADO ---
// Para resolver el error de compilación, integramos el componente Button
// directamente en este archivo, eliminando la necesidad de una importación externa.
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out";
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
    danger:
      "bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500",
    "danger-outline":
      "bg-white text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-500",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ""}
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

/**
 * Componente TaskForm
 * Renderiza un formulario para crear o editar una tarea.
 * @param {object} props - Propiedades del componente.
 * @param {object|null} props.task - La tarea a editar, o null si es nueva.
 * @param {Array} [props.projects=[]] - Lista de proyectos disponibles.
 * @param {Array} [props.users=[]] - Lista de usuarios disponibles.
 * @param {function} props.onSave - Función a llamar para guardar la tarea.
 * @param {function} props.onCancel - Función a llamar para cancelar.
 * @returns {JSX.Element} El formulario de la tarea.
 */
const TaskForm = ({ task, projects = [], users = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending", // Valor por defecto
    project_id: "",
    assigned_to: "",
  });
  const [error, setError] = useState("");

  // Efecto para precargar los datos si se está editando una tarea
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Pending",
        project_id: task.project_id || "",
        assigned_to: task.assigned_to || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.project_id) {
      setError("El título y el proyecto son obligatorios.");
      return;
    }

    // Preparamos los datos a enviar, convirtiendo a null si no hay asignado
    const dataToSave = {
      ...formData,
      assigned_to:
        formData.assigned_to === "" ? null : Number(formData.assigned_to),
      project_id: Number(formData.project_id),
    };

    setError("");
    if (typeof onSave === "function") {
      onSave(dataToSave);
    }
  };

  const statusOptions = ["Pending", "In Progress", "Completed"];

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Título de la Tarea
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
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
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="project_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Proyecto
          </label>
          <select
            id="project_id"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            required
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="assigned_to"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Asignar a
          </label>
          <select
            id="assigned_to"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="">Sin asignar</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end space-x-4 pt-2">
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Tarea
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
