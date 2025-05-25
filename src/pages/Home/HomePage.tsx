import React from 'react';
import CarruselEmpresa from '../../components/Carrusel/carrusel';
import FeaturesSection from '../../components/Features/Features';
import TestimonialsSection from '../../components/Testimonials/Testimonials';

const HomePage = () => {
    return (
        <div className="home-page">
            <CarruselEmpresa />
            <FeaturesSection />
            <TestimonialsSection />
        </div>
    );
};

export default HomePage; 