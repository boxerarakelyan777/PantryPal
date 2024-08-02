// src/components/Footer.tsx
"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>PantryPalAI</h3>
          <p>Track and manage your pantry items with ease. Stay organized and never let your groceries go to waste.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/pantry" className="footer-link">Demo</a></li>
            <li><a href="#" className="footer-link">Features</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <ul className="footer-links">
            <li><a href="https://www.linkedin.com/in/rudik-arakelyan/" className="footer-link">LinkedIn</a></li>
            <li><a href="https://x.com/boxerarakelyan" className="footer-link">Twitter</a></li>
            <li><a href="https://github.com/boxerarakelyan777" className="footer-link">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 PantryPalAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
