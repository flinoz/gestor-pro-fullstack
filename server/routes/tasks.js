/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// --- Definición de Rutas para Tareas ---

// @route   GET api/tasks
// @desc    Obtener todas las tareas
// @access  Public
router.get('/', getAllTasks);

// @route   POST api/tasks
// @desc    Crear una nueva tarea
// @access  Public
router.post('/', createTask);

// @route   PUT api/tasks/:id
// @desc    Actualizar una tarea por su ID
// @access  Public
router.put('/:id', updateTask);

// @route   DELETE api/tasks/:id
// @desc    Eliminar una tarea por su ID
// @access  Public
router.delete('/:id', deleteTask);

module.exports = router;