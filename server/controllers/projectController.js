/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
// Importamos el modelo de Proyecto para interactuar con la base de datos
const Project = require('../models/Project');

/**
 * @desc    Obtener todos los proyectos
 * @route   GET /api/projects
 * @access  Public
 */
const getAllProjects = async (req, res) => {
    try {
        // Utilizamos el modelo para obtener todos los proyectos
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener proyectos.' });
    }
};

/**
 * @desc    Crear un nuevo proyecto
 * @route   POST /api/projects
 * @access  Public
 */
const createProject = async (req, res) => {
    try {
        // Creamos el proyecto usando el modelo
        const newProject = await Project.create(req.body);
        
        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'project' });
        
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el proyecto.' });
    }
};

/**
 * @desc    Actualizar un proyecto existente
 * @route   PUT /api/projects/:id
 * @access  Public
 */
const updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Project.updateById(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'project' });

        res.status(200).json({ message: 'Proyecto actualizado con éxito.' });
    } catch (error) {
        console.error(`Error al actualizar el proyecto ${id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el proyecto.' });
    }
};

/**
 * @desc    Eliminar un proyecto
 * @route   DELETE /api/projects/:id
 * @access  Public
 */
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Project.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'project' });

        res.status(200).json({ message: 'Proyecto eliminado con éxito.' });
    } catch (error) {
        console.error(`Error al eliminar el proyecto ${id}:`, error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'No se puede eliminar el proyecto porque tiene tareas asociadas.' });
        }
        res.status(500).json({ message: 'Error interno del servidor al eliminar el proyecto.' });
    }
};


module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
};
