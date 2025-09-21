/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import axios from 'axios';

// --- Configuración de la instancia de Axios ---
const apiClient = axios.create({
    baseURL: 'http://localhost:5001/api', // La URL base de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor para manejar errores de forma centralizada.
 * Esto nos permite extraer el mensaje de error específico del backend si existe.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el error tiene una respuesta del servidor y un mensaje, lo propagamos.
        if (error.response && error.response.data && error.response.data.message) {
            return Promise.reject(new Error(error.response.data.message));
        }
        // Si no, devolvemos el mensaje de error genérico de Axios.
        return Promise.reject(new Error(error.message));
    }
);


// --- Objeto del servicio API ---
const apiService = {

    // == Endpoints de Proyectos ==
    getProjects: async () => {
        const response = await apiClient.get('/projects');
        return response.data;
    },
    createProject: async (projectData) => {
        const response = await apiClient.post('/projects', projectData);
        return response.data;
    },
    updateProject: async (id, projectData) => {
        const response = await apiClient.put(`/projects/${id}`, projectData);
        return response.data;
    },
    deleteProject: async (id) => {
        const response = await apiClient.delete(`/projects/${id}`);
        return response.data;
    },

    // == Endpoints de Tareas ==
    getTasks: async () => {
        const response = await apiClient.get('/tasks');
        return response.data;
    },
    createTask: async (taskData) => {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    },
    updateTask: async (id, taskData) => {
        const response = await apiClient.put(`/tasks/${id}`, taskData);
        return response.data;
    },
    deleteTask: async (id) => {
        const response = await apiClient.delete(`/tasks/${id}`);
        return response.data;
    },

    // == Endpoints de Usuarios ==
    getUsers: async () => {
        const response = await apiClient.get('/users');
        return response.data;
    },
    createUser: async (userData) => {
        const response = await apiClient.post('/users', userData);
        return response.data;
    },
    updateUser: async (id, userData) => {
        const response = await apiClient.put(`/users/${id}`, userData);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await apiClient.delete(`/users/${id}`);
        return response.data;
    },
};

export default apiService;
