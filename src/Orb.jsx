import React, { useState, useEffect } from "react";
import "./orb.css";
import orbSound from "./assets/orb-sound.mp3";

const Orb = () => {
  const [hovered, setHovered] = useState(false);
  const [canPlaySound, setCanPlaySound] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Learn more about me on the about page.",
    "Contact me through the Contact page.",
    "Click on the cards to learn about my work.",
  ];

  useEffect(() => {
    let interval;
    if (hovered) {
      interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [hovered]);

  const playSound = () => {
    if (!canPlaySound) return;
    const audio = new Audio(orbSound);
    audio.play();
    setCanPlaySound(false);
    setTimeout(() => setCanPlaySound(true), 2000);
  };

  return (
    <div
      className="orb-container"
      onMouseEnter={() => {
        setHovered(true);
        playSound();
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="orb-glow" />
      {hovered && (
        <div className="orb-tooltip show">
          <p className="orb-tip-text">{tips[currentTip]}</p>
          <div className="orb-dots">
            {tips.map((_, i) => (
              <span
                key={i}
                className={i === currentTip ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orb;
