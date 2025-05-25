import React from 'react';
import './Features.css';
import { FaClock, FaShieldAlt, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';

const features = [
    {
        icon: <FaClock />,
        title: "Proceso Ágil",
        description: "Solicita tu crédito en minutos y recíbelo en menos de 24 horas, sin complicaciones."
    },
    {
        icon: <FaShieldAlt />,
        title: "Seguridad Garantizada",
        description: "Tus datos están protegidos bajo estrictos protocolos de seguridad digital."
    },
    {
        icon: <FaHandHoldingUsd />,
        title: "Tasas Competitivas",
        description: "Ofrecemos condiciones accesibles, claras y sin letras pequeñas."
    },
    {
        icon: <FaChartLine />,
        title: "Impulso Financiero",
        description: "Diseñado para ayudarte a crecer y alcanzar tus metas personales o familiares."
    }
];

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <div className="features-container">
                <h2 className="features-title">¿Por qué elegir Credifiel?</h2>
                <p className="features-subtitle">
                    Más de 20 años apoyando a trabajadores mexicanos con soluciones financieras claras y confiables.
                </p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div className="cta-button-wrapper">
                    <a href="https://www.credifiel.com.mx/contacto" className="cta-button">Solicita tu crédito</a>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
