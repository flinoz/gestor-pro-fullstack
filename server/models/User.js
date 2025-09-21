/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const db = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * El objeto User actúa como nuestro Modelo para los usuarios.
 * Contiene todos los métodos para interactuar con la tabla 'users' y
 * maneja la lógica de seguridad para las contraseñas.
 */
const User = {
    /**
     * Busca y devuelve todos los usuarios de la base de datos, excluyendo la contraseña.
     * @returns {Promise<Array>} Una promesa que resuelve a un array de usuarios.
     */
    findAll: async () => {
        const sql = 'SELECT id, name, email, role, created_at FROM users ORDER BY name ASC';
        const [users] = await db.query(sql);
        return users;
    },

    /**
     * Busca un usuario por su email. Este método es útil para verificar duplicados
     * y para futuras implementaciones de login.
     * @param {string} email - El email del usuario a buscar.
     * @returns {Promise<object|null>} El objeto de usuario completo si se encuentra, de lo contrario null.
     */
    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(sql, [email]);
        return users[0] || null;
    },

    /**
     * Crea un nuevo usuario, hasheando su contraseña antes de guardarla.
     * @param {object} userData - Los datos del usuario a crear.
     * @returns {Promise<object>} Una promesa que resuelve al nuevo usuario creado (sin la contraseña).
     */
    create: async (userData) => {
        const { name, email, password, role } = userData;

        // Hashear la contraseña para un almacenamiento seguro
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [name, email, hashedPassword, role || 'Developer']);

        return { id: result.insertId, name, email, role: role || 'Developer' };
    },

    /**
     * Actualiza un usuario por su ID. Si se proporciona una nueva contraseña, la hashea.
     * @param {number} id - El ID del usuario a actualizar.
     * @param {object} userData - Los nuevos datos para el usuario.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    updateById: async (id, userData) => {
        const { name, email, password, role } = userData;

        // Construcción de la consulta y parámetros dinámicamente
        let sql = 'UPDATE users SET name = ?, email = ?, role = ?';
        const params = [name, email, role, id];

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            sql += ', password = ?';
            params.splice(3, 0, hashedPassword); // Insertar la contraseña hasheada en la posición correcta
        }

        sql += ' WHERE id = ?';

        const [result] = await db.query(sql, params);
        return result;
    },

    /**
     * Elimina un usuario de la base de datos por su ID.
     * @param {number} id - El ID del usuario a eliminar.
     * @returns {Promise<object>} El objeto de resultado de la consulta de la base de datos.
     */
    deleteById: async (id) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
};

module.exports = User;