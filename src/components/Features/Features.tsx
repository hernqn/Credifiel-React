import React from 'react';
import './Features.css';
import { FaClock, FaShieldAlt, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';

const features = [
    {
        icon: <FaClock />,
        title: "Proceso Rápido",
        description: "Obtén tu préstamo en menos de 24 horas con nuestro proceso simplificado y eficiente."
    },
    {
        icon: <FaShieldAlt />,
        title: "100% Seguro",
        description: "Tu información está protegida con los más altos estándares de seguridad y encriptación."
    },
    {
        icon: <FaHandHoldingUsd />,
        title: "Mejores Tasas",
        description: "Ofrecemos tasas competitivas y transparentes, sin costos ocultos ni sorpresas."
    },
    {
        icon: <FaChartLine />,
        title: "Crecimiento Financiero",
        description: "Te ayudamos a alcanzar tus metas financieras con asesoramiento personalizado."
    }
];

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <div className="features-container">
                <h2 className="features-title">¿Por qué elegir Credifiel?</h2>
                <p className="features-subtitle">
                    Descubre las ventajas que nos hacen la mejor opción en préstamos personales
                </p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection; 