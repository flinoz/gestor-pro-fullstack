¡Hola! Este es el repositorio del proyecto "Gestor Pro", una aplicación web full-stack diseñada para la gestión eficiente de proyectos de desarrollo de software.

1. Introducción y Objetivo del Proyecto
Gestor Pro es una herramienta robusta que permite a los equipos de desarrollo gestionar proyectos, asignar tareas y administrar usuarios de una manera centralizada e intuitiva. El objetivo principal es ofrecer una plataforma que no solo organice el trabajo, sino que también facilite la colaboración en tiempo real, asegurando que todos los miembros del equipo estén siempre sincronizados con los últimos cambios.

Esta primera fase del proyecto sienta las bases de un sistema escalable, implementando las funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) esenciales y la comunicación instantánea mediante WebSockets.

2. Características Principales
Gestión de Proyectos: Creación, edición y eliminación de proyectos con nombre y descripción.

Gestión de Tareas: Creación de tareas detalladas con título, descripción, estado (Pendiente, En Progreso, Completado), y asignación a un proyecto y a un usuario específico.

Gestión de Usuarios: Administración de usuarios con roles (Admin, Project Manager, Developer) y almacenamiento seguro de contraseñas mediante hasheo.

Actualizaciones en Tiempo Real: Gracias a la implementación de WebSockets, cualquier cambio se refleja instantáneamente en las pantallas de todos los demás usuarios conectados.

Interfaz Limpia y Responsiva: Diseño intuitivo que se adapta correctamente a diferentes tamaños de pantalla.

3. Tecnologías Utilizadas (Tech Stack)
Este proyecto fue construido utilizando un stack de tecnologías moderno y demandado en la industria del desarrollo de software.

Frontend (Lado del Cliente)
React (v18): Biblioteca líder para construir interfaces de usuario interactivas y basadas en componentes.

Tailwind CSS: Framework de CSS "utility-first" para un diseño rápido y moderno.

Axios: Cliente HTTP basado en promesas para realizar las peticiones a la API.

Backend (Lado del Servidor)
Node.js: Entorno de ejecución de JavaScript del lado del servidor.

Express.js: Framework minimalista y flexible para construir la API REST.

MySQL2: Cliente de MySQL optimizado con soporte para Promesas (async/await).

WebSockets (ws): Biblioteca para la comunicación bidireccional y en tiempo real.

Bcrypt.js: Librería para el hasheo seguro de las contraseñas.

Nodemon: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.

4. Guía de Instalación y Puesta en Marcha
Para ejecutar este proyecto en un entorno local, sigue los siguientes pasos:

Prerrequisitos
Node.js (versión 16 o superior). Puedes descargarlo desde nodejs.org.

Un servidor de MySQL corriendo en tu máquina (ej. XAMPP, WAMP, MySQL Workbench).

Paso 1: Configuración del Backend
Clona el repositorio: git clone [URL-de-tu-repositorio]

Navega a la carpeta del servidor: cd gestor-pro/server

Instala las dependencias: npm install

Configura la base de datos:

Abre el archivo server/config/database.js.

Modifica los campos user y password con tus credenciales de MySQL.

Crea la base de datos y las tablas:

Abre tu cliente de MySQL preferido.

Copia y ejecuta el código SQL que se encuentra al final del archivo server/server.js.

Inicia el servidor: npm run dev

Si todo está correcto, verás el mensaje: 🚀 Servidor corriendo en http://localhost:5001

Paso 2: Configuración del Frontend
Abre una nueva terminal.

Navega a la carpeta del cliente: cd gestor-pro/client

Instala las dependencias: npm install

Inicia la aplicación de React: npm start

Este comando abrirá automáticamente tu navegador en http://localhost:3000.

¡Y listo! Ahora tienes el sistema "Gestor Pro" ❤️ corriendo localmente en tu máquina.

📜 Licencia
Este proyecto se encuentra bajo una licencia de derechos de autor exclusivos.

Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.

Para más detalles, consulta el archivo LICENSE.

👨‍💻 Autor

contacto: flinoz91@gmail.com

GitHub: https://github.com/flinoz/gestor-pro-fullstack

¡Gracias por revisar este proyecto!
