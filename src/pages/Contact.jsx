import React from "react";
import { Link } from "react-router-dom";
import "./contact.css"; // we'll create this next

export default function Contact() {
  return (
    <div className="page-content">
      {/* Blurry top navbar */}
      <nav className="nav show">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Envelope + Letter */}
      <div className="envelope">
        <div className="envelope-flap" />
        <div className="letter">
          <h1>Contact</h1>
          <p>
            Email: <a href="mailto:beasbishnu@gmail.com">beasbishnu@gmail.com</a>
          </p>
          <p>
            Art Instagram:{" "}
            <a
              href="https://instagram.com/beas.draws"
              target="_blank"
              rel="noopener noreferrer"
            >
              @beas.draws
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/YOUR_USERNAME
            </a>
          </p>
          <p className="reach-out">
            Please feel free to reach out to me!
          </p>
        </div>
      </div>
    </div>
  );
}
