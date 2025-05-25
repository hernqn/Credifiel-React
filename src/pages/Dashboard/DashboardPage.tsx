import React from 'react';
import './DashboardPage.css';
import DashboardPrincipal from '../../components/Dashboard/Dashboard';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <h1 className="dashboard-page-title">Panel de Control</h1>
            <DashboardPrincipal />
        </div>
    );
};

export default DashboardPage; 