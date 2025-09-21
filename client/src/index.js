/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/main.css'; // Asegura que los estilos base se apliquen globalmente

// 1. Obtenemos el elemento raíz del DOM donde se montará la aplicación.
const rootElement = document.getElementById('root');

// 2. Creamos el root de la aplicación utilizando la API moderna de React 18.
const root = ReactDOM.createRoot(rootElement);

// 3. Renderizamos el componente principal <App /> dentro del root.
// React.StrictMode es un wrapper que ayuda a detectar problemas potenciales en la app.
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

