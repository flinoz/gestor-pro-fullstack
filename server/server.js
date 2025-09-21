/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
// -----------------------------------------------------------------------------
//                GESTOR PRO - PUNTO DE ENTRADA DEL SERVIDOR (server.js)
// -----------------------------------------------------------------------------
// Este es el archivo principal que inicia el servidor backend.
//
// Para ejecutar el servidor:
// 1. Asegúrate de tener Node.js instalado.
// 2. Abre una terminal en la carpeta 'server/'.
// 3. Ejecuta `npm install` para instalar todas las dependencias del package.json.
// 4. Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo (con nodemon).
//    o `npm start` para iniciarlo en modo de producción.
// -----------------------------------------------------------------------------

// --- IMPORTACIONES DE MÓDULOS ---
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const cors = require('cors');

// --- IMPORTACIONES DE RUTAS ---
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

// --- INICIALIZACIÓN DE LA APP ---
const app = express();
const server = http.createServer(app); // Creamos un servidor HTTP a partir de la app de Express
const wss = new WebSocketServer({ server }); // Adjuntamos el servidor de WebSockets al servidor HTTP

// --- CONFIGURACIÓN DE PUERTO ---
const PORT = process.env.PORT || 5001;

// --- MIDDLEWARES ---
// Habilita Cross-Origin Resource Sharing para permitir peticiones desde el frontend
app.use(cors());
// Permite que Express parsee cuerpos de petición en formato JSON
app.use(express.json());

// --- LÓGICA DE WEBSOCKETS PARA ACTUALIZACIONES EN TIEMPO REAL ---
// Guardamos todas las conexiones de clientes en un Set para un manejo eficiente.
const clients = new Set();

wss.on('connection', (ws, req) => {
    clients.add(ws);
    console.log(`✅ Cliente conectado al WebSocket. Total clientes: ${clients.size}`);
    console.log(`📍 IP del cliente: ${req.socket.remoteAddress}`);

    // Marcar como vivo inicialmente
    ws.isAlive = true;

    // Enviar mensaje de bienvenida al cliente con un pequeño delay para asegurar que está listo
    setTimeout(() => {
        try {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ 
                    type: 'connection_established', 
                    message: 'Conectado al servidor en tiempo real',
                    timestamp: new Date().toISOString()
                }));
            }
        } catch (error) {
            console.error('❌ Error enviando mensaje de bienvenida:', error);
        }
    }, 100);

    ws.on('close', (code, reason) => {
        clients.delete(ws);
        console.log(`❌ Cliente desconectado del WebSocket. Código: ${code}, Razón: ${reason || 'Sin razón'}`);
        console.log(`📊 Total clientes restantes: ${clients.size}`);
    });

    ws.on('error', (error) => {
        console.error('❌ Error en WebSocket:', error);
        clients.delete(ws); // Remover cliente con error
    });

    // Manejar mensajes ping/pong para mantener la conexión viva
    ws.on('pong', () => {
        ws.isAlive = true;
    });
});

// Ping a los clientes cada 30 segundos para verificar que están vivos
const pingInterval = setInterval(() => {
    clients.forEach((client) => {
        if (client.isAlive === false) {
            console.log('🔌 Cerrando conexión inactiva');
            client.terminate();
            clients.delete(client);
            return;
        }
        client.isAlive = false;
        client.ping();
    });
}, 30000);

// Limpiar interval al cerrar el servidor
wss.on('close', () => {
    clearInterval(pingInterval);
});

/**
 * Función para notificar a todos los clientes conectados sobre un cambio.
 * @param {object} data - El objeto de datos a enviar.
 */
const broadcast = (data) => {
    if (clients.size === 0) {
        console.log('📢 No hay clientes conectados para broadcast');
        return;
    }

    const message = JSON.stringify(data);
    const deadClients = [];

    clients.forEach((client) => {
        try {
            if (client.readyState === client.OPEN) {
                client.send(message);
            } else {
                deadClients.push(client);
            }
        } catch (error) {
            console.error('❌ Error enviando mensaje a cliente:', error);
            deadClients.push(client);
        }
    });

    // Limpiar clientes muertos
    deadClients.forEach(client => {
        clients.delete(client);
    });

    console.log(`📢 Broadcast enviado a ${clients.size} clientes:`, data);
};

// Hacemos la función `broadcast` accesible en toda la app a través de `app.locals`.
// Así, los controladores podrán llamarla después de una operación exitosa en la DB.
app.locals.broadcast = broadcast;

// --- DEFINICIÓN DE RUTAS DE LA API ---
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// --- RUTA DE BIENVENIDA ---
app.get('/', (req, res) => {
    res.send('API de Gestor Pro está funcionando correctamente.');
});

// --- INICIO DEL SERVIDOR ---
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


/*
-- -----------------------------------------------------------------------------
--                ESQUEMA DE LA BASE DE DATOS (MySQL)
-- -----------------------------------------------------------------------------
-- Copia y pega todo este bloque en tu cliente de MySQL (como MySQL Workbench o DBeaver)
-- para crear la base de datos y todas las tablas necesarias con sus relaciones.
-- -----------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS gestor_pro_db;

USE gestor_pro_db;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Project Manager', 'Developer') DEFAULT 'Developer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proyectos
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tareas
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    project_id INT NOT NULL,
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relación: Una tarea pertenece a un proyecto.
    CONSTRAINT fk_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE, -- Si se elimina un proyecto, se eliminan sus tareas.

    -- Relación: Una tarea puede ser asignada a un usuario.
    CONSTRAINT fk_user
        FOREIGN KEY (assigned_to) REFERENCES users(id)
        ON DELETE SET NULL -- Si se elimina un usuario, la tarea queda "sin asignar".
);

*/
