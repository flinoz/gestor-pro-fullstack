/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React, { useState, useEffect } from "react";

// --- COMPONENTE BUTTON INTEGRADO ---
// Para resolver el error de importación, el componente Button se define aquí directamente.
const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '',}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out';
  const variantStyles = {
    primary: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
    'danger-outline': 'bg-white text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-500',
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyles : ''} ${className}`.trim();

  return (
    <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
};


/**
 * Componente UserForm
 * Renderiza un formulario para crear o editar un usuario.
 * @param {object} props - Propiedades del componente.
 * @param {object|null} props.user - El usuario a editar, o null si es nuevo.
 * @param {function} props.onSave - Función para guardar los datos del usuario.
 * @param {function} props.onCancel - Función para cancelar la operación.
 * @returns {JSX.Element} El formulario de usuario.
 */
const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Developer", // Rol por defecto
  });
  const [error, setError] = useState("");

  // Carga los datos del usuario cuando se abre el formulario para editar
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // La contraseña nunca se precarga por seguridad
        role: user.role || "Developer",
      });
    }
  }, [user]);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Maneja el envío del formulario.
   * Valida los datos y prepara el objeto a guardar.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("El nombre y el email son obligatorios.");
      return;
    }
    // La contraseña solo es obligatoria al crear un nuevo usuario
    if (!user && !formData.password) {
      setError("La contraseña es obligatoria para nuevos usuarios.");
      return;
    }
    
    setError("");

    // Prepara los datos a enviar. Si la contraseña está vacía al editar, no la incluye.
    const dataToSave = { ...formData };
    if (user && !dataToSave.password) {
      delete dataToSave.password;
    }
    
    // Verifica que onSave sea una función antes de llamarla
    if (typeof onSave === 'function') {
      onSave(dataToSave);
    }
  };

  const roleOptions = ["Admin", "Project Manager", "Developer"];

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={user ? "Dejar en blanco para no cambiar" : ""}
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Rol
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
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
          Guardar Usuario
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
