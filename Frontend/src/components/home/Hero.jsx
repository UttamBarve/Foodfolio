import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // 🔹 Fetch slides
  useEffect(() => {
    apiRequest("/api/hero").then((data) => {
      setSlides(data);
      setCurrent(0); // ✅ reset index when data loads
    });
  }, []);

  // 🔹 Auto slide (ONLY when slides exist)
  useEffect(() => {
    if (slides.length === 0) return; // ✅ guard

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // ⛔ Prevent render until slides load
  if (slides.length === 0) return null;

  return (
    <section className="hero text-center" id="home" aria-label="home">
      <ul className="hero-slider">
        {slides.map((slide, index) => (
          <li
            key={slide._id}
            className={`slider-item ${
              index === current ? "active" : ""
            }`}
          >
            <div className="slider-bg">
              <img
                src={slide.image}
                alt="hero"
                className="img-cover"
              />
            </div>

            <p className="label-2 section-subtitle slider-reveal">
              {slide.subtitle}
            </p>

            <h1 className="display-1 hero-title slider-reveal">
              {slide.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            <p className="body-2 hero-text slider-reveal">
              {slide.text}
            </p>

            <a href="#menu" className="btn btn-primary slider-reveal">
              <span className="text text-1">View Our Menu</span>
              <span className="text text-2">View Our Menu</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <button className="slider-btn prev" onClick={prevSlide}>
        <ion-icon name="chevron-back"></ion-icon>
      </button>

      <button className="slider-btn next" onClick={nextSlide}>
        <ion-icon name="chevron-forward"></ion-icon>
      </button>

      {/* Book table */}
      <a href="#reservation" className="hero-btn has-after">
        <img
          src="/assets/images/hero-icon.png"
          width="48"
          height="48"
          alt="booking"
        />
        <span className="label-2 text-center span">
          Book A Table
        </span>
      </a>
    </section>
  );
};

export default Hero;
