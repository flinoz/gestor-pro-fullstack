/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// --- Definición de Rutas para Proyectos ---

// @route   GET api/projects
// @desc    Obtener todos los proyectos
// @access  Public
router.get('/', getAllProjects);

// @route   POST api/projects
// @desc    Crear un nuevo proyecto
// @access  Public
router.post('/', createProject);

// @route   PUT api/projects/:id
// @desc    Actualizar un proyecto por su ID
// @access  Public
router.put('/:id', updateProject);

// @route   DELETE api/projects/:id
// @desc    Eliminar un proyecto por su ID
// @access  Public
router.delete('/:id', deleteProject);

module.exports = router;
