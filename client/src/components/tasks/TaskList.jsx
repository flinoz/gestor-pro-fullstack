/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import Modal from '../common/Modal';
import apiService from '../../services/api';



// --- COMPONENTES COMUNES (Integrados para evitar errores de importación) ---

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out';
  const variantStyles = {
    primary: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
    'danger-outline': 'bg-white text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-500',
  };
  const sizeStyles = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyles : ''} ${className}`.trim();
  return <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>{children}</button>;
};


const Spinner = ({ text = 'Cargando...' }) => (
  <div className="flex flex-col justify-center items-center h-full my-10">
    <svg className="animate-spin text-indigo-600 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    {text && <p className="mt-4 text-sm font-medium text-gray-600">{text}</p>}
  </div>
);

const TaskForm = ({ task, projects = [], users = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending', project_id: '', assigned_to: '' });
  const [error, setError] = useState('');
  useEffect(() => {
    if (task) {
      setFormData({ title: task.title || '', description: task.description || '', status: task.status || 'Pending', project_id: task.project_id || '', assigned_to: task.assigned_to || '' });
    }
  }, [task]);
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.project_id) { setError('El título y el proyecto son obligatorios.'); return; }
    const dataToSave = { ...formData, assigned_to: formData.assigned_to === '' ? null : Number(formData.assigned_to), project_id: Number(formData.project_id) };
    setError('');
    if (onSave) onSave(dataToSave);
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div><label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título de la Tarea</label><input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
      <div><label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label><textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label htmlFor="project_id" className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label><select id="project_id" name="project_id" value={formData.project_id} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" required><option value="">Selecciona un proyecto</option>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <div><label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700 mb-1">Asignar a</label><select id="assigned_to" name="assigned_to" value={formData.assigned_to} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"><option value="">Sin asignar</option>{users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
      </div>
      <div><label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label><select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">{['Pending', 'In Progress', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end space-x-4 pt-2"><Button type="button" onClick={onCancel} variant="secondary">Cancelar</Button><Button type="submit" variant="primary">Guardar Tarea</Button></div>
    </form>
  );
};



// --- COMPONENTE PRINCIPAL ---

const TaskList = ({ refreshKey, showNotification }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, projectsData, usersData] = await Promise.all([
        apiService.getTasks(),
        apiService.getProjects(),
        apiService.getUsers(),
      ]);
      setTasks(tasksData);
      setProjects(projectsData);
      setUsers(usersData);
    } catch (err) {
      const msg = 'No se pudieron cargar los datos de tareas. Asegúrate de que el servidor funciona.';
      setError(msg);
      if (typeof showNotification === 'function') {
        showNotification('error', msg);
      }
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (selectedTask) {
        await apiService.updateTask(selectedTask.id, taskData);
        showNotification('success', 'Tarea actualizada con éxito.');
      } else {
        await apiService.createTask(taskData);
        showNotification('success', 'Tarea creada con éxito.');
      }
      handleCloseModal();
    } catch (err) {
      showNotification('error', `Error al guardar la tarea: ${err.message}`);
    }
  };

  const handleOpenConfirmModal = (task) => {
    setTaskToDelete(task);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await apiService.deleteTask(taskToDelete.id);
      showNotification('success', 'Tarea eliminada con éxito.');
      handleCloseConfirmModal();
    } catch (err) {
      showNotification('error', `Error al eliminar la tarea: ${err.message}`);
    }
  };

  if (loading) return <Spinner text="Cargando tareas..." />;
  if (error) return <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tareas</h1>
        <Button onClick={() => handleOpenModal()} variant="primary">
          Añadir Tarea
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 bg-gray-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">No hay tareas creadas</h3>
          <p>¡Crea tu primera tarea para empezar a trabajar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleOpenModal(task)}
              onDelete={() => handleOpenConfirmModal(task)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
            </h2>
            <button
              onClick={handleCloseModal}
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
          <TaskForm
            task={selectedTask}
            projects={projects}
            users={users}
            onSave={handleSaveTask}
            onCancel={handleCloseModal}
          />
        </div>
      )}

      {isConfirmModalOpen && (
        <Modal title="Confirmar Eliminación" onClose={handleCloseConfirmModal}>
          <div className="p-4">
            <p className="text-gray-700">
              ¿Estás seguro de que deseas eliminar la tarea
              <strong className="mx-1">"{taskToDelete?.title}"</strong>?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <Button onClick={handleCloseConfirmModal} variant="secondary">Cancelar</Button>
              <Button onClick={handleDeleteTask} variant="danger">Eliminar</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskList;