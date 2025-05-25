import React, { useState, useEffect } from "react";
import './Carrusel.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const data = [
    { 
        img: "https://cdn2.hubspot.net/hubfs/2741331/LP-%20Requisitos%20de%20un%20credito%20con%20credifiel/cta-03.png",
        alt: "Créditos Credifiel"
    },
    { 
        img: "https://multifinanca.com/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-16-at-20.04.21.jpeg",
        alt: "Servicios Financieros"
    },
    { 
        img: "https://cdn.noticiasenlamira.com/2020/06/Credifiel.jpg",
        alt: "Beneficios Credifiel"
    }
];

const CarruselEmpresa = () => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        let interval: number;
        if (isPlaying) {
            interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % data.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const next = () => {
        setIndex((index + 1) % data.length);
        setIsPlaying(false);
    };

    const prev = () => {
        setIndex((index - 1 + data.length) % data.length);
        setIsPlaying(false);
    };

    return (
        <div className="carousel-wrapper">
            <div className="carousel-image-container">
                <img 
                    src={data[index].img} 
                    alt={data[index].alt} 
                    className="carousel-image"
                />
                <button onClick={prev} className="carousel-btn left">
                    <FaChevronLeft />
                </button>
                <button onClick={next} className="carousel-btn right">
                    <FaChevronRight />
                </button>
                
            </div>
        </div>
    );
};

export default CarruselEmpresa;
