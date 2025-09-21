/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React from "react";
import ProjectList from "./projects/ProjectList";
import TaskList from "./tasks/TaskList";
import UserList from "./users/UserList";

/**
 * Componente Dashboard
 * Actúa como un enrutador simple para mostrar la vista correcta (Proyectos, Tareas o Usuarios).
 * @param {object} props - Propiedades del componente.
 * @param {string} props.currentView - La vista actual que se debe mostrar ('projects', 'tasks', 'users').
 * @param {number} props.refreshKey - Una clave que cambia para forzar la recarga de datos.
 * @param {function} props.showNotification - Función para mostrar notificaciones.
 * @returns {JSX.Element} El componente de la lista correspondiente a la vista actual.
 */
const Dashboard = ({ currentView, refreshKey, showNotification }) => {
  // Un switch para renderizar el componente de lista apropiado basado en la prop 'currentView'.
  switch (currentView) {
    case "tasks":
      return (
        <TaskList refreshKey={refreshKey} showNotification={showNotification} />
      );
    case "users":
      return (
        <UserList refreshKey={refreshKey} showNotification={showNotification} />
      );
    case "projects":
    default:
      // La vista 'projects' es la predeterminada.
      return (
        <ProjectList
          refreshKey={refreshKey}
          showNotification={showNotification}
        />
      );
  }
};

export default Dashboard;
