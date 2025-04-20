import React, { useState, useEffect, useRef } from "react";
import sunImage from "./assets/sun.png";  // Replace with your sun image path
import moonImage from "./assets/moon.png"; // Replace with your moon image path
import sunMoonHoverSound from "./assets/sun-moon-hover.mp3"; // Replace with your sound file path
import "./SunMoon.css";

const SunMoon = () => {
  const [isDay, setIsDay] = useState(false); // To check if it's day or night
  const [position, setPosition] = useState(0); // To move the sun up and down
  const soundRef = useRef(new Audio(sunMoonHoverSound)); // Audio reference

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 18) {
        setIsDay(true); // Daytime (5 AM to 6 PM)
      } else {
        setIsDay(false); // Nighttime (6 PM to 5 AM)
      }
    };

    checkTime(); // Check the time immediately on load

    // Update position for sun's movement from 5 AM to 6 PM
    const moveSun = () => {
      if (isDay) {
        const newPosition = Math.sin(Date.now() / 1000) * 20; // Move up and down with sine wave
        setPosition(newPosition);
      }
    };

    // Continuously update the position every 100ms
    const interval = setInterval(moveSun, 100);

    return () => clearInterval(interval);
  }, [isDay]);

  const handleHover = () => {
    soundRef.current.play(); // Play sound on hover
  };

  return (
    <div className={`sunmoon-container ${isDay ? "day" : "night"}`}>
      <img
        src={isDay ? sunImage : moonImage}
        alt={isDay ? "Sun" : "Moon"}
        className="sunmoon-img"
        style={{
          transform: `translateY(${position}px)`,
        }}
        onMouseEnter={handleHover} // Add hover listener to the image
      />
    </div>
  );
};

export default SunMoon;
