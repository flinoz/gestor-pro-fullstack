/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const db = require('../config/database');

/**
 * El objeto Project actúa como nuestro Modelo.
 * Contiene todos los métodos para interactuar directamente con la tabla 'projects' en la base de datos.
 * Esta abstracción permite que los controladores no necesiten conocer los detalles de las consultas SQL.
 */
const Project = {
    /**
     * Busca y devuelve todos los proyectos de la base de datos.
     * @returns {Promise<Array>} Una promesa que resuelve a un array de proyectos.
     */
    findAll: async () => {
        const sql = 'SELECT * FROM projects ORDER BY created_at DESC';
        const [projects] = await db.query(sql);
        return projects;
    },

    /**
     * Crea un nuevo proyecto en la base de datos.
     * @param {object} projectData - Los datos del proyecto a crear.
     * @param {string} projectData.name - El nombre del proyecto.
     * @param {string} [projectData.description] - La descripción del proyecto.
     * @returns {Promise<object>} Una promesa que resuelve al nuevo proyecto con su ID.
     */
    create: async (projectData) => {
        const { name, description } = projectData;
        const sql = 'INSERT INTO projects (name, description) VALUES (?, ?)';
        const [result] = await db.query(sql, [name, description || null]);
        return { id: result.insertId, ...projectData };
    },

    /**
     * Actualiza un proyecto existente por su ID.
     * @param {number} id - El ID del proyecto a actualizar.
     * @param {object} projectData - Los nuevos datos para el proyecto.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    updateById: async (id, projectData) => {
        const { name, description } = projectData;
        const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
        const [result] = await db.query(sql, [name, description, id]);
        return result;
    },

    /**
     * Elimina un proyecto de la base de datos por su ID.
     * @param {number} id - El ID del proyecto a eliminar.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    deleteById: async (id) => {
        const sql = 'DELETE FROM projects WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
};

module.exports = Project;
