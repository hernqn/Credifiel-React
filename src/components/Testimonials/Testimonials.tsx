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
        name: "Laura Ramírez",
        role: "Empleado de Gobierno",
        comment: "Obtener mi préstamo fue rápido y sin complicaciones. La atención personalizada de Credifiel hizo toda la diferencia.",
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5TcVFjPc_Z0ZdLUAA2Df6uTrJL1C5Al4-w&s"
    },
    {
        name: "Carlos Méndez",
        role: "Pequeño Empresario",
        comment: "Gracias a Credifiel pude ampliar mi negocio. Me ofrecieron condiciones claras y un servicio impecable.",
        rating: 5,
        image: "https://www.clarin.com/2023/12/01/rhVeUAooY_2000x1500__1.jpg"
    },
    {
        name: "Andrea López",
        role: "Maestra",
        comment: "Me sorprendió lo sencillo que fue el proceso. La asesoría fue clara desde el inicio. Totalmente recomendable.",
        rating: 4,
        image: "https://centrointegraldepsicologia.com/wp-content/uploads/2023/06/El-Sindrome-de-la-Buena-Persona-Los-Limites-Olvidados-1024x576.png"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="testimonials-section">
            <h2 className="testimonials-title">Testimonios de nuestros clientes</h2>
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
                        <p className="testimonial-comment">"{testimonial.comment}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
