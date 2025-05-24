import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      
      <div className="dashboard-grid">
        {/* Widget de Resumen */}
        <div className="dashboard-widget">
          <h3>Resumen</h3>
          <div className="widget-content">
            {/* Contenido del widget */}
            <p>Contenido del widget de resumen</p>
          </div>
        </div>

        {/* Widget de Estadísticas */}
        <div className="dashboard-widget">
          <h3>Estadísticas</h3>
          <div className="widget-content">
            {/* Contenido del widget */}
            <p>Contenido del widget de estadísticas</p>
          </div>
        </div>

        {/* Widget de Actividad Reciente */}
        <div className="dashboard-widget">
          <h3>Actividad Reciente</h3>
          <div className="widget-content">
            {/* Contenido del widget */}
            <p>Contenido del widget de actividad</p>
          </div>
        </div>

        {/* Widget de Tareas Pendientes */}
        <div className="dashboard-widget">
          <h3>Tareas Pendientes</h3>
          <div className="widget-content">
            {/* Contenido del widget */}
            <p>Contenido del widget de tareas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 