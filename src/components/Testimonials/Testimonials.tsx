import React from 'react';
import './Testimonials.css';
import { FaStar } from 'react-icons/fa';

interface Testimonial {
    name: string;
    role: string;
    comment: string;
    rating: number;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        name: "María González",
        role: "Cliente Satisfecha",
        comment: "Credifiel me ayudó a conseguir el préstamo que necesitaba con un proceso muy sencillo y rápido. ¡Excelente servicio!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        name: "Juan Pérez",
        role: "Empresario",
        comment: "La mejor opción para préstamos empresariales. El equipo de atención al cliente es muy profesional y eficiente.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: "Ana Martínez",
        role: "Profesora",
        comment: "Gracias a Credifiel pude financiar mis estudios de posgrado. Las tasas son muy competitivas.",
        rating: 4,
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="testimonials-section">
            <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>
            <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        <div className="testimonial-header">
                            <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="testimonial-image"
                            />
                            <div className="testimonial-info">
                                <h3 className="testimonial-name">{testimonial.name}</h3>
                                <p className="testimonial-role">{testimonial.role}</p>
                            </div>
                        </div>
                        <div className="testimonial-rating">
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i}
                                    className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                                />
                            ))}
                        </div>
                        <p className="testimonial-comment">{testimonial.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection; 