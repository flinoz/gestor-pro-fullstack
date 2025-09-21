/*!
 * Sistema: "Gestor Pro"
 * Copyright (c) 2025 Felipe Lino. Todos los derechos reservados.
 * Uso, reproducción o distribución sin autorización expresa está prohibida.
 * Jurisdicción: México
 */
import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard";
import "./assets/styles/main.css";

/**
 * Componente Notification
 * Muestra una notificación individual con un temporizador para desaparecer.
 */
const Notification = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 3000); // La notificación desaparece después de 3 segundos

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const baseClasses =
    "p-4 m-2 rounded-lg shadow-lg text-white text-sm animate-fade-in-right";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]}`}>
      {notification.message}
    </div>
  );
};

/**
 * Componente App
 * Es el componente raíz de la aplicación.
 */
function App() {
  const [currentView, setCurrentView] = useState("projects"); // projects, tasks, users
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Clave para forzar actualizaciones

  // --- Lógica de Notificaciones ---
  const showNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // --- Lógica de WebSockets para actualizaciones en tiempo real ---
  useEffect(() => {
    let ws = null;
    let reconnectTimeout = null;
    let initialConnectionTimeout = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const baseReconnectDelay = 1000; // 1 segundo
    const initialDelay = 2000; // Esperar 2 segundos antes de la primera conexión

    const connectWebSocket = (isInitialConnection = false) => {
      try {
        ws = new WebSocket("ws://localhost:5001");

        ws.onopen = () => {
          console.log("✅ Conectado al servidor de WebSockets.");
          reconnectAttempts = 0; // Resetear intentos de reconexión
          
          // Solo mostrar notificación de éxito si no es la primera conexión o si es después de varios intentos
          if (!isInitialConnection || reconnectAttempts > 0) {
            showNotification("success", "Conectado en tiempo real.");
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "data_changed") {
              showNotification(
                "info",
                `Los datos han sido actualizados en tiempo real.`
              );
              // Incrementamos la clave para forzar la recarga en los componentes hijos
              setRefreshKey((prevKey) => prevKey + 1);
            } else if (data.type === "connection_established") {
              // No mostrar notificación para el mensaje de bienvenida
              console.log("🤝 Conexión establecida:", data.message);
            }
          } catch (parseError) {
            console.error("Error al parsear mensaje WebSocket:", parseError);
          }
        };

        ws.onclose = (event) => {
          console.log("❌ Desconectado del servidor de WebSockets.", event.code, event.reason);
          
          // Solo intentar reconectar si no fue un cierre intencional
          if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
            const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts); // Backoff exponencial
            console.log(`🔄 Intentando reconectar en ${delay}ms... (intento ${reconnectAttempts + 1}/${maxReconnectAttempts})`);
            
            reconnectTimeout = setTimeout(() => {
              reconnectAttempts++;
              connectWebSocket(false);
            }, delay);
          } else if (reconnectAttempts >= maxReconnectAttempts) {
            console.error("❌ Máximo número de intentos de reconexión alcanzado.");
            showNotification("error", "No se pudo reconectar al servidor en tiempo real.");
          }
        };

        ws.onerror = (error) => {
          console.error("❌ Error en WebSocket:", error);
          // Solo mostrar error si ya hemos intentado conectar varias veces
          if (reconnectAttempts > 0 || !isInitialConnection) {
            showNotification("error", "Error de conexión en tiempo real.");
          }
        };

      } catch (error) {
        console.error("❌ Error al crear WebSocket:", error);
        // Solo mostrar error si no es la primera conexión
        if (!isInitialConnection) {
          showNotification("error", "Error al establecer conexión en tiempo real.");
        }
      }
    };

    // Esperar un poco antes de la primera conexión para dar tiempo al servidor
    console.log(`⏳ Esperando ${initialDelay}ms antes de conectar WebSocket...`);
    initialConnectionTimeout = setTimeout(() => {
      connectWebSocket(true);
    }, initialDelay);

    // Limpieza al desmontar el componente
    return () => {
      if (initialConnectionTimeout) {
        clearTimeout(initialConnectionTimeout);
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (ws) {
        ws.close(1000, "Componente desmontado"); // Cierre normal
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Contenedor de notificaciones */}
      <div className="fixed top-4 right-4 z-50">
        {notifications.map((n) => (
          <Notification
            key={n.id}
            notification={n}
            onDismiss={dismissNotification}
          />
        ))}
      </div>

      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex flex-1">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <Dashboard
            currentView={currentView}
            refreshKey={refreshKey}
            showNotification={showNotification}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
