/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import UserItem from './UserItem';
import Modal from '../common/Modal';
import apiService from '../../services/api';


// --- COMPONENTES COMUNES INTEGRADOS ---
const Button = ({ children, onClick, type = "button", variant = "primary", size = "md", disabled = false, className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out";
  const variantStyles = {
    primary: "bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
    danger: "bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500",
    "danger-outline": "bg-white text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-500"
  };
  const sizeStyles = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const disabledStyles = "opacity-50 cursor-not-allowed";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyles : ""} ${className}`.trim();
  return <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>{children}</button>;
};


const Spinner = ({ text = "Cargando..." }) => (
  <div className="flex flex-col justify-center items-center h-full my-10">
    <svg className="animate-spin text-indigo-600 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    {text && <p className="mt-4 text-sm font-medium text-gray-600">{text}</p>}
  </div>
);


const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Developer" });
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) setFormData({ name: user.name || "", email: user.email || "", password: "", role: user.role || "Developer" });
  }, [user]);
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) { setError("El nombre y el email son obligatorios."); return; }
    if (!user && !formData.password) { setError("La contraseña es obligatoria para nuevos usuarios."); return; }
    setError("");
    const dataToSave = { ...formData };
    if (user && !dataToSave.password) delete dataToSave.password;
    if (onSave) onSave(dataToSave);
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
      <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
      <div><label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label><input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder={user ? "Dejar en blanco para no cambiar" : ""} /></div>
      <div><label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rol</label><select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">{["Admin", "Project Manager", "Developer"].map(role => <option key={role} value={role}>{role}</option>)}</select></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end space-x-4 pt-2"><Button type="button" onClick={onCancel} variant="secondary">Cancelar</Button><Button type="submit" variant="primary">Guardar Usuario</Button></div>
    </form>
  );
};

/**
 * Componente UserList (Principal)
 */
const UserList = ({ refreshKey, showNotification }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (err) {
      const errorMessage = "No se pudieron cargar los usuarios. Asegúrate de que el servidor esté funcionando.";
      setError(errorMessage);
      if (typeof showNotification === "function") showNotification("error", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshKey]);

  const handleOpenFormModal = (user = null) => { setSelectedUser(user); setIsFormModalOpen(true); };
  const handleCloseFormModal = () => { setIsFormModalOpen(false); setSelectedUser(null); };
  const handleOpenConfirmModal = (user) => { setUserToDelete(user); setIsConfirmModalOpen(true); };
  const handleCloseConfirmModal = () => { setIsConfirmModalOpen(false); setUserToDelete(null); };

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        await apiService.updateUser(selectedUser.id, userData);
        showNotification("success", "Usuario actualizado con éxito.");
      } else {
        await apiService.createUser(userData);
        showNotification("success", "Usuario creado con éxito.");
      }
      handleCloseFormModal();
    } catch (err) {
      showNotification("error", `Error al guardar: ${err.message}`);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await apiService.deleteUser(userToDelete.id);
      showNotification("success", "Usuario eliminado con éxito.");
      handleCloseConfirmModal();
    } catch (err) {
      showNotification("error", `Error al eliminar: ${err.message}`);
    }
  };

  if (loading) return <Spinner text="Cargando usuarios..." />;
  if (error) return <div className="text-center text-red-500 mt-8 p-4 bg-red-50 rounded-lg"><p className="font-semibold">¡Ocurrió un error!</p><p>{error}</p></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Usuarios</h1>
        <Button onClick={() => handleOpenFormModal()} variant="primary">Añadir Usuario</Button>
      </div>
      {users.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 bg-gray-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">No hay usuarios registrados</h3>
          <p>Añade tu primer usuario para empezar a construir tu equipo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {users.map((user) => (<UserItem key={user.id} user={user} onEdit={() => handleOpenFormModal(user)} onDelete={() => handleOpenConfirmModal(user)} />))}
        </div>
      )}
      {isFormModalOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </h2>
            <button
              onClick={handleCloseFormModal}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Cerrar formulario"
            >
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
          <UserForm user={selectedUser} onSave={handleSaveUser} onCancel={handleCloseFormModal} />
        </div>
      )}
      {isConfirmModalOpen && (
        <Modal title="Confirmar Eliminación" onClose={handleCloseConfirmModal}>
          <div className="p-4">
            <p className="text-gray-700">¿Estás seguro de que deseas eliminar a <strong className="mx-1">"{userToDelete?.name}"</strong>? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-4 mt-6"><Button onClick={handleCloseConfirmModal} variant="secondary">Cancelar</Button><Button onClick={handleDeleteUser} variant="danger">Eliminar</Button></div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
