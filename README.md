Gestor Pro - Sistema de Gestión de Proyectos
¡Hola! Este es el repositorio del proyecto "Gestor Pro", una aplicación web full-stack diseñada para la gestión eficiente de proyectos de desarrollo de software. 


1. Introducción y Objetivo del Proyecto
   Gestor Pro es una herramienta robusta que permite a los equipos de desarrollo gestionar proyectos, asignar tareas y administrar usuarios de una manera centralizada e intuitiva. El objetivo principal es ofrecer una plataforma que no solo organice el trabajo, sino que también facilite la colaboración en tiempo real, asegurando que todos los miembros del equipo estén siempre sincronizados con los últimos cambios.

Esta primera fase del proyecto sienta las bases de un sistema escalable, implementando las funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) esenciales y la comunicación instantánea mediante WebSockets.

2. Características Principales
   Gestión de Proyectos: Creación, edición y eliminación de proyectos con nombre y descripción.

Gestión de Tareas: Creación de tareas detalladas con título, descripción, estado (Pendiente, En Progreso, Completado), y asignación a un proyecto y a un usuario específico.

Gestión de Usuarios: Administración de usuarios con roles (Admin, Project Manager, Developer) y almacenamiento seguro de contraseñas mediante hasheo.

Actualizaciones en Tiempo Real: Gracias a la implementación de WebSockets, cualquier cambio realizado por un usuario (como crear una nueva tarea) se refleja instantáneamente en las pantallas de todos los demás usuarios conectados, sin necesidad de recargar la página.

Interfaz Limpia y Responsiva: El diseño está pensado para ser intuitivo y se adapta correctamente a diferentes tamaños de pantalla, desde dispositivos móviles hasta ordenadores de escritorio.

3. Tecnologías Utilizadas (Tech Stack)
   Este proyecto fue construido utilizando un stack de tecnologías moderno y demandado en la industria del desarrollo de software.

Frontend (Lado del Cliente)
React (v18): Biblioteca líder para construir interfaces de usuario interactivas y basadas en componentes.

Tailwind CSS: Framework de CSS "utility-first" que permite un diseño rápido, moderno y completamente personalizable.

Axios: Cliente HTTP basado en promesas para realizar las peticiones a la API del backend de forma sencilla y eficiente.

Backend (Lado del Servidor)
Node.js: Entorno de ejecución de JavaScript del lado del servidor.

Express.js: Framework minimalista y flexible para construir la API REST.

MySQL2: Cliente de MySQL para Node.js, optimizado para ofrecer un alto rendimiento y soporte para Promesas (async/await).

WebSockets (ws): Biblioteca para establecer una comunicación bidireccional y en tiempo real entre el cliente y el servidor.

Bcrypt.js: Librería para el hasheo seguro de las contraseñas de los usuarios antes de almacenarlas en la base de datos.

Nodemon: Herramienta que reinicia automáticamente el servidor durante el desarrollo cada vez que se detecta un cambio en el código.

4. Guía de Instalación y Puesta en Marcha
   Para ejecutar este proyecto en un entorno local, sigue los siguientes pasos:

Prerrequisitos
Node.js y npm: Asegúrate de tener instalado Node.js (versión 16 o superior). Puedes descargarlo desde nodejs.org.

Servidor de MySQL: Necesitas tener un servidor de MySQL corriendo en tu máquina (puedes usar XAMPP, WAMP, MySQL Workbench, etc.).

Paso 1: Configuración del Backend
Clonar el repositorio: git clone [URL-de-tu-repositorio]

Navegar a la carpeta del servidor: cd gestor-pro/server

Instalar dependencias: npm install

Configurar la base de datos:

Abre el archivo server/config/database.js.

Modifica los campos user y password con tus credenciales de MySQL.

Crear la base de datos y las tablas:

Abre tu cliente de MySQL preferido (MySQL Workbench, DBeaver, etc.).

Copia todo el código SQL que se encuentra al final del archivo server/server.js y ejecútalo. Esto creará la base de datos gestor_pro_db y todas las tablas necesarias.

Iniciar el servidor: npm run dev

Si todo está correcto, verás el mensaje: 🚀 Servidor corriendo en http://localhost:5001

Paso 2: Configuración del Frontend
Abre una nueva terminal.

Navegar a la carpeta del cliente: cd gestor-pro/client

Instalar dependencias: npm install

Iniciar la aplicación de React: npm start

Este comando abrirá automáticamente una nueva pestaña en tu navegador en http://localhost:3000 con la aplicación funcionando.

¡Y listo! Ahora tienes el sistema "Gestor Pro" ❤️ corriendo localmente en tu máquina.

¡Gracias por revisar mi proyecto!
