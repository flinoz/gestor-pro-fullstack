/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */

import React, { useState, useEffect, useCallback } from "react";
import apiService from "../../services/api";
import ProjectItem from "./ProjectItem";
import ProjectForm from "./ProjectForm";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import apiService from "../../services/api";
import ProjectItem from "./ProjectItem";
import ProjectForm from "./ProjectForm";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Spinner from "../common/Spinner";

/**
 * Componente ProjectList
 * Gestiona y muestra la lista de proyectos.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.refreshKey - Clave para forzar la recarga de datos.
 * @param {function} props.showNotification - Función para mostrar notificaciones.
 * @returns {JSX.Element} El componente de la lista de proyectos.
 */
const ProjectList = ({ refreshKey, showNotification }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      const errorMessage = "No se pudieron cargar los proyectos. Asegúrate de que el servidor esté funcionando.";
      setError(errorMessage);
      // Verificación de seguridad antes de llamar a la función
      if (typeof showNotification === 'function') {
        showNotification("error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, refreshKey]);

  const handleOpenModal = (project = null) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSaveProject = async (projectData) => {
    try {
      if (selectedProject) {
        await apiService.updateProject(selectedProject.id, projectData);
        if (typeof showNotification === 'function') {
          showNotification("success", "Proyecto actualizado con éxito.");
        }
      } else {
        await apiService.createProject(projectData);
        if (typeof showNotification === 'function') {
          showNotification("success", "Proyecto creado con éxito.");
        }
      }
      handleCloseModal();
    } catch (err) {
      if (typeof showNotification === 'function') {
        showNotification("error", `Error al guardar: ${err.message}`);
      }
    }
  };

  const handleOpenConfirmModal = (project) => {
    setProjectToDelete(project);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setProjectToDelete(null);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await apiService.deleteProject(projectToDelete.id);
      if (typeof showNotification === 'function') {
        showNotification("success", "Proyecto eliminado con éxito.");
      }
      handleCloseConfirmModal();
    } catch (err) {
      if (typeof showNotification === 'function') {
        showNotification("error", `Error al eliminar: ${err.message}`);
      }
    }
  };

  if (loading) return <Spinner text="Cargando proyectos..." />;
  if (error) return (
    <div className="text-center text-red-500 mt-8 p-4 bg-red-50 rounded-lg shadow-sm">
      <p className="font-semibold">¡Ocurrió un error!</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Proyectos
        </h1>
        <Button onClick={() => handleOpenModal()} variant="primary">
          Añadir Proyecto
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 bg-gray-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            No hay proyectos todavía
          </h3>
          <p>¡Crea tu primer proyecto para empezar a organizarte!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onEdit={() => handleOpenModal(project)}
              onDelete={() => handleOpenConfirmModal(project)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedProject ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
            </h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Cerrar formulario"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ProjectForm
            project={selectedProject}
            onSave={handleSaveProject}
            onCancel={handleCloseModal}
          />
        </div>
      )}

      {isConfirmModalOpen && (
        <Modal title="Confirmar Eliminación" onClose={handleCloseConfirmModal}>
          <div className="p-4">
            <p className="text-gray-700">
              ¿Estás seguro de que deseas eliminar el proyecto
              <strong className="mx-1">"{projectToDelete?.name}"</strong>? Esta
              acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <Button onClick={handleCloseConfirmModal} variant="secondary">
                Cancelar
              </Button>
              <Button onClick={handleDeleteProject} variant="danger">
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectList;
