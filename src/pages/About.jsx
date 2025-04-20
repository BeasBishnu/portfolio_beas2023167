import React from "react";
import { Link } from "react-router-dom";
import myPhoto from "../assets/beas-photo.jpeg";

// Software icons
import figmaIcon from "../assets/icons/figma.png";
import canvaIcon from "../assets/icons/canva.png";
import medibangIcon from "../assets/icons/medibang.png";
import illustratorIcon from "../assets/icons/illustrator.png";
import fusion360Icon from "../assets/icons/fusion360.png";
import corelPainterIcon from "../assets/icons/corel.png";
import mayaIcon from "../assets/icons/maya.png";
import procreateIcon from "../assets/icons/procreate.png";

function About() {
  return (
    <div className="page-content">
      {/* Top navigation bar */}
      <nav className="nav show">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* About section */}
      <div
        className="about-container"
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "2rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Text box */}
        <div
          className="about-text-box"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "1.5rem",
            color: "#f3e8ff",
            fontFamily: "'Cinzel', serif",
            fontSize: "1.3rem",
            lineHeight: 1.7,
          }}
        >
          <h1 style={{ marginBottom: "0.75rem" }}>About Me</h1>
          <p>
            Hello there! I'm Beas, a passionate Computer Science and Design
            Student currently studying at Indraprastha Institute of Information
            Technology Delhi. I enjoy drawing and painting, alongside Human
            Computer Interaction. My interests lie in 2D animation, game design,
            and UI/UX. Apart from all that, I'm also a trained Hindustani
            Classical Singer and I love to read Tarot Cards! (evidently)
          </p>
        </div>

        {/* Image box that matches text-box height */}
        <div
          className="about-image"
          style={{
            flex: "0 0 300px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={myPhoto}
            alt="Beas"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Skills box: now 70% width and same upward shift */}
      <div
        className="skills-box"
        style={{
          width: "70%",
          margin: "-1rem auto 0",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          color: "#f3e8ff",
          fontFamily: "'Cinzel', serif",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        <h2>Tools I Know</h2>
        <div
          className="software-icons"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            margin: "0.5rem 0 1rem",
          }}
        >
          <img src={figmaIcon} alt="Figma" />
          <img src={canvaIcon} alt="Canva" />
          <img src={medibangIcon} alt="MediBang" />
          <img src={illustratorIcon} alt="Adobe Illustrator" />
          <img src={fusion360Icon} alt="Fusion 360" />
          <img src={corelPainterIcon} alt="Corel Painter" />
          <img src={mayaIcon} alt="Autodesk Maya" />
          <img src={procreateIcon} alt="Procreate" />
        </div>

        <h2 style={{ marginTop: "0" }}>Soft Skills</h2>
        <p>Python, C, C++, Java, HTML, CSS, JavaScript</p>
      </div>
    </div>
  );
}

export default About;
