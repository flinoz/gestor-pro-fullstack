/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
// Importamos el modelo de Usuario para interactuar con la base de datos
const User = require('../models/User');

/**
 * @desc    Obtener todos los usuarios (sin contraseñas)
 * @route   GET /api/users
 * @access  Public
 */
const getAllUsers = async (req, res) => {
    try {
        // Usamos el modelo para obtener todos los usuarios de forma segura
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
    }
};

/**
 * @desc    Crear un nuevo usuario
 * @route   POST /api/users
 * @access  Public
 */
const createUser = async (req, res) => {
    try {
        // 1. Verificamos primero si el email ya existe usando el modelo
        const existingUser = await User.findByEmail(req.body.email);
        if (existingUser) {
            return res.status(409).json({ message: 'El email ya está en uso.' }); // 409 Conflict
        }

        // 2. Si no existe, creamos el usuario con el modelo (que se encarga de hashear la contraseña)
        const newUser = await User.create(req.body);

        // 3. ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'user' });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el usuario.' });
    }
};

/**
 * @desc    Actualizar un usuario existente
 * @route   PUT /api/users/:id
 * @access  Public
 */
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.updateById(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'user' });

        res.status(200).json({ message: 'Usuario actualizado con éxito.' });
    } catch (error) {
        // Manejo de error específico para emails duplicados
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El email ya está en uso por otro usuario.' });
        }
        console.error(`Error al actualizar el usuario ${id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el usuario.' });
    }
};

/**
 * @desc    Eliminar un usuario
 * @route   DELETE /api/users/:id
 * @access  Public
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // ¡Éxito! Notificamos a todos los clientes sobre el cambio en tiempo real
        req.app.locals.broadcast({ type: 'data_changed', entity: 'user' });

        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
    } catch (error) {
        console.error(`Error al eliminar el usuario ${id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el usuario.' });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
