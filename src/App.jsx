import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./index.css";

import backImg from "./assets/back.png";
import aceImg from "./assets/ace.png";
import card1 from "./assets/card1.png";
import card2 from "./assets/card2.png";
import card3 from "./assets/card3.png";
import card4 from "./assets/card4.png";
import card5 from "./assets/card5.png";
import card6 from "./assets/card6.png";
import flipSound from "./assets/flip-sound.mp3";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Orb from "./Orb";
import SunMoon from "./SunMoon";

export default function App() {
  const [flipped, setFlipped] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [viewerCount, setViewerCount] = useState(
    Math.floor(Math.random() * 11)
  );
  const flipSoundRef = useRef(new Audio(flipSound));
  const location = useLocation();

  const handleFlip = () => {
    setFlipped(true);
    flipSoundRef.current.play();
    setTimeout(() => setShowCards(true), 800);
  };

  // Simulate viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(Math.floor(Math.random() * 11));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keep cards visible when returning to home
  useEffect(() => {
    if (location.pathname === "/" && flipped) {
      setShowCards(true);
    }
  }, [location.pathname, flipped]);

  // Cursor trail
  useEffect(() => {
    const canvas = document.getElementById("cursor-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: Math.random() * 1.5 + 0.5,
      });
      if (particles.length > 200) particles.shift();
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
        ctx.restore();

        p.alpha -= 0.02;
        p.y -= 0.3;
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Stars (always running)
  useEffect(() => {
    const canvas = document.getElementById("stars-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    const numStars = 100;

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speedY: Math.random() * 0.7 + 0.2,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    resize();
    window.addEventListener("resize", resize);

    let animationFrameId;
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speedY;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animateStars);
    };
    animateStars();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Canvas layers */}
      <canvas id="cursor-canvas" className="cursor-canvas" />
      <canvas id="stars-canvas" className="stars-canvas" />

      {/* Blurry Navbar */}
      <nav className={`nav ${flipped ? "show" : "hide"}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Render SunMoon and Orb only on Home (grid) page */}
      {location.pathname === "/" && showCards && (
        <>
          <SunMoon />
          <Orb />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Initial flip card */}
              {!flipped && (
                <motion.div
                  className="scene"
                  onClick={handleFlip}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: flipped ? 0 : 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className={`card ${flipped ? "is-flipped" : ""}`}>
                    <img
                      src={backImg}
                      alt="Card Back"
                      className="card-face back-face"
                    />
                    <img
                      src={aceImg}
                      alt="Ace of Spades"
                      className="card-front card-face"
                    />
                  </div>
                </motion.div>
              )}

              {/* Grid of project cards */}
              {showCards && (
                <motion.div
                  className="grid-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {[card1, card2, card3, card4, card5, card6].map(
                    (card, i) => {
                      const randomX = Math.random() * 600 - 300;
                      const randomY = Math.random() * 600 - 300;
                      const randomRotate = Math.random() * 360 - 180;
                      return (
                        <motion.div
                          key={i}
                          className="card"
                          initial={{
                            x: randomX,
                            y: randomY,
                            rotate: randomRotate,
                            opacity: 0,
                            scale: 0.6,
                          }}
                          animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            delay: 0.3 + i * 0.2,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                          }}
                          whileHover={{ scale: 1.1, zIndex: 2 }}
                        >
                          <Link to={`/card/${i + 1}`}>
                            <img
                              src={card}
                              alt={`Card ${i + 1}`}
                              className="card-face"
                            />
                          </Link>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/card/:id" element={<div>Card Details</div>} />
      </Routes>

      {/* Viewer count at bottom */}
      <div className="viewer-count">
        👀 {viewerCount} people are viewing this page
      </div>
    </div>
  );
}
