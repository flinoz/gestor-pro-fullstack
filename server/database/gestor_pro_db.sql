-- -----------------------------------------------------------------------------
--                ESQUEMA DE LA BASE DE DATOS GESTOR PRO (MySQL)
-- -----------------------------------------------------------------------------
/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
-- Este archivo contiene todas las sentencias SQL necesarias para crear
-- la estructura completa de la base de datos para la aplicación Gestor Pro.
--
-- Instrucciones:
-- 1. Abre tu cliente de MySQL preferido (MySQL Workbench, DBeaver, phpMyAdmin, etc.).
-- 2. Copia y pega todo el contenido de este archivo en una nueva pestaña de consulta.
-- 3. Ejecuta el script.
-- -----------------------------------------------------------------------------

-- Paso 1: Crear la base de datos si no existe.
-- Se recomienda el juego de caracteres `utf8mb4` para soportar una amplia gama de caracteres, incluyendo emojis.
CREATE DATABASE IF NOT EXISTS gestor_pro_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Paso 2: Seleccionar la base de datos recién creada para trabajar sobre ella.
USE gestor_pro_db;

-- -----------------------------------------------------------------------------
-- Tabla de Usuarios (`users`)
-- Almacena la información de los usuarios que pueden acceder al sistema.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    -- ID único para cada usuario. Es la clave primaria.
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Nombre completo del usuario. No puede ser nulo.
    name VARCHAR(255) NOT NULL,
    -- Email del usuario. Debe ser único para cada usuario y no puede ser nulo.
    email VARCHAR(255) NOT NULL UNIQUE,
    -- Contraseña del usuario, almacenada de forma segura (hasheada). No puede ser nula.
    password VARCHAR(255) NOT NULL,
    -- Rol del usuario dentro del sistema. Define sus permisos.
    role ENUM('Admin', 'Project Manager', 'Developer') DEFAULT 'Developer',
    -- Fecha y hora de creación del registro del usuario.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla de Proyectos (`projects`)
-- Almacena la información de los proyectos que se gestionarán.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    -- ID único para cada proyecto. Es la clave primaria.
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Nombre del proyecto. No puede ser nulo.
    name VARCHAR(255) NOT NULL,
    -- Descripción detallada del proyecto. Es opcional.
    description TEXT,
    -- Fecha y hora de creación del registro del proyecto.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla de Tareas (`tasks`)
-- Almacena las tareas individuales, asociadas a proyectos y usuarios.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    -- ID único para cada tarea. Es la clave primaria.
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Título o nombre de la tarea. No puede ser nulo.
    title VARCHAR(255) NOT NULL,
    -- Descripción detallada de la tarea. Es opcional.
    description TEXT,
    -- Estado actual de la tarea.
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    -- ID del proyecto al que pertenece la tarea. No puede ser nulo.
    project_id INT NOT NULL,
    -- ID del usuario al que se ha asignado la tarea. Es opcional.
    assigned_to INT,
    -- Fecha y hora de creación del registro de la tarea.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Fecha y hora de la última actualización de la tarea. Se actualiza automáticamente.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- --- Definición de Relaciones (Claves Externas) ---

    -- Relación: Una tarea debe pertenecer a un proyecto.
    CONSTRAINT fk_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        -- Si un proyecto se elimina, todas sus tareas asociadas se eliminarán en cascada.
        ON DELETE CASCADE,

    -- Relación: Una tarea puede ser asignada a un usuario.
    CONSTRAINT fk_user
        FOREIGN KEY (assigned_to) REFERENCES users(id)
        -- Si un usuario es eliminado, el campo `assigned_to` de sus tareas se establecerá en NULL.
        -- Esto evita errores y deja la tarea "sin asignar".
        ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
--                               FIN DEL SCRIPT
-- -----------------------------------------------------------------------------