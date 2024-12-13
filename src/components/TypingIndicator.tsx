import React from 'react';
import '../styles/TypingIndicator.css';

function TypingIndicator() {
  return (
    <div className="message bot typing-indicator">
      <div className="message-content">
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
