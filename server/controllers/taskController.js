/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
// Importamos el modelo de Tarea para interactuar con la base de datos
const Task = require('../models/Task');

/**
 * @desc    Obtener todas las tareas con información adicional
 * @route   GET /api/tasks
 * @access  Public
 */
const getAllTasks = async (req, res) => {
    try {
        // Utilizamos el modelo para obtener todas las tareas
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener tareas.' });
    }
};

/**
 * @desc    Crear una nueva tarea
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        
        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'task' });
        
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear la tarea.' });
    }
};

/**
 * @desc    Actualizar una tarea existente
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Task.updateById(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'task' });

        res.status(200).json({ message: 'Tarea actualizada con éxito.' });
    } catch (error) {
        console.error(`Error al actualizar la tarea ${id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar la tarea.' });
    }
};

/**
 * @desc    Eliminar una tarea
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Task.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'task' });

        res.status(200).json({ message: 'Tarea eliminada con éxito.' });
    } catch (error) {
        console.error(`Error al eliminar la tarea ${id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar la tarea.' });
    }
};


module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
