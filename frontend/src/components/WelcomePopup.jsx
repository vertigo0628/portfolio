import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './WelcomePopup.css';

const WelcomePopup = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="welcome-content">
          <div className="welcome-avatar">
            <div className="avatar-wave">👋</div>
          </div>
          <h2 className="welcome-title">Welcome to vertiGO!</h2>
          <p className="welcome-message">
            Hi there! I'm Lewis Gitau, and I'm thrilled you're here. Explore my portfolio to see my work in mobile development, software engineering, UI/UX design, and cyber security.
          </p>
          <p className="welcome-submessage">
            Let's build something amazing together!
          </p>
          <button className="welcome-button" onClick={onClose}>
            Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
