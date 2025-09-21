/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const db = require('../config/database');

/**
 * El objeto Task actúa como nuestro Modelo para las tareas.
 * Centraliza toda la lógica de base de datos para la tabla 'tasks'.
 */
const Task = {
    /**
     * Busca y devuelve todas las tareas, incluyendo los nombres del proyecto y del usuario asignado.
     * @returns {Promise<Array>} Una promesa que resuelve a un array de tareas.
     */
    findAll: async () => {
        const sql = `
      SELECT 
        t.*, 
        p.name AS project_name, 
        u.name AS assigned_to_name 
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assigned_to = u.id
      ORDER BY t.created_at DESC
    `;
        const [tasks] = await db.query(sql);
        return tasks;
    },

    /**
     * Crea una nueva tarea en la base de datos.
     * @param {object} taskData - Los datos de la tarea a crear.
     * @returns {Promise<object>} Una promesa que resuelve a la nueva tarea con su ID.
     */
    create: async (taskData) => {
        const { title, description, status, project_id, assigned_to } = taskData;
        const sql = 'INSERT INTO tasks (title, description, status, project_id, assigned_to) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [
            title,
            description,
            status || 'Pending',
            project_id,
            assigned_to || null,
        ]);
        return { id: result.insertId, ...taskData };
    },

    /**
     * Actualiza una tarea existente por su ID.
     * @param {number} id - El ID de la tarea a actualizar.
     * @param {object} taskData - Los nuevos datos para la tarea.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    updateById: async (id, taskData) => {
        const { title, description, status, project_id, assigned_to } = taskData;
        const sql = 'UPDATE tasks SET title = ?, description = ?, status = ?, project_id = ?, assigned_to = ? WHERE id = ?';
        const [result] = await db.query(sql, [
            title,
            description,
            status,
            project_id,
            assigned_to || null,
            id,
        ]);
        return result;
    },

    /**
     * Elimina una tarea de la base de datos por su ID.
     * @param {number} id - El ID de la tarea a eliminar.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    deleteById: async (id) => {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
};

module.exports = Task;
