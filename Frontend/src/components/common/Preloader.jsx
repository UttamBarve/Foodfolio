import { useEffect, useState } from "react";

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Always unlock scroll after mount
    document.body.classList.add("loaded");

    // Optional: small delay for animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preload ${loaded ? "loaded" : ""}`}>
      <div className="circle"></div>
      <p className="text">Foodfolio</p>
    </div>
  );
};

export default Preloader;
