/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// --- Definición de Rutas para Usuarios ---

// @route   GET api/users
// @desc    Obtener todos los usuarios
// @access  Public
router.get('/', getAllUsers);

// @route   POST api/users
// @desc    Crear un nuevo usuario
// @access  Public
router.post('/', createUser);

// @route   PUT api/users/:id
// @desc    Actualizar un usuario por su ID
// @access  Public
router.put('/:id', updateUser);

// @route   DELETE api/users/:id
// @desc    Eliminar un usuario por su ID
// @access  Public
router.delete('/:id', deleteUser);

module.exports = router;
