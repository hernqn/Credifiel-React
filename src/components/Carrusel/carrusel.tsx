import React, { useState, useEffect } from "react";
import './Carrusel.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const data = [
    { 
        img: "https://blog.credifiel.com.mx/hubfs/credifiel%20tu%20mejor%20opcion%20para%20prestamo.jpeg",
        alt: "Créditos Credifiel"
    },
    { 
        img: "https://info.credifiel.com.mx/hubfs/WhatsApp%20Image%202024-12-03%20at%2017.37.33_11zon.jpeg",
        alt: "Servicios Financieros"
    },
    { 
        img: "https://2741331.fs1.hubspotusercontent-na1.net/hubfs/2741331/seguridad-confianza-credifiel.jpeg",
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
