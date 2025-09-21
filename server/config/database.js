/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

// 1. Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// 2. Importa la librería correcta: 'mysql2' en lugar de 'mysql'
const mysql = require('mysql2');

/**
 * Configuración de la Conexión a la Base de Datos
 * Lee las credenciales de forma segura desde las variables de entorno.
 */
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD, // Lee la contraseña desde .env
    database: process.env.DB_NAME || 'gestor_pro_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Creamos el pool de conexiones a partir de la configuración
const pool = mysql.createPool(dbConfig);

// Verificamos si la conexión es exitosa
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión fue rechazada. Verifica que el servidor MySQL esté corriendo y que las credenciales en el archivo .env son correctas.');
        }
        return;
    }
    if (connection) {
        console.log('✅ Conexión exitosa a la base de datos MySQL!');
        connection.release(); // Devolvemos la conexión al pool
    }
});

// Exportamos la versión del pool que utiliza Promesas para poder usar async/await
module.exports = pool.promise();
