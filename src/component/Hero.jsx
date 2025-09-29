// Hero.jsx
import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>
          100 Thousand Songs, ad-free <br />
          Over thousands podcast episodes
        </h1>
      </div>
      <div className="hero-image">
        <img src="/images/vibrating-headphone.png" alt="Headphones" />
      </div>
    </div>
  );
};

export default Hero;
