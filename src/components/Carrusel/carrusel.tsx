import React, { useState } from "react";
import './Carrusel.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const data = [
    { img: "https://cdn2.hubspot.net/hubfs/2741331/LP-%20Requisitos%20de%20un%20credito%20con%20credifiel/cta-03.png" },
    { img: "https://multifinanca.com/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-16-at-20.04.21.jpeg" },
    { img: "https://cdn.noticiasenlamira.com/2020/06/Credifiel.jpg" }
];

const CarruselEmpresa = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((index + 1) % data.length);
    const prev = () => setIndex((index - 1 + data.length) % data.length);

    return (
        <div className="carousel-wrapper">
            <div className="carousel-image-container">
                <img src={data[index].img} alt={`Slide ${index}`} />
                <button onClick={prev} className="carousel-btn left"><FaChevronLeft /></button>
                <button onClick={next} className="carousel-btn right"><FaChevronRight /></button>
            </div>
        </div>
    );
};

export default CarruselEmpresa;
