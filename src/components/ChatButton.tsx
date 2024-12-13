import React from 'react';
import '../styles/ChatButtonStyle.css';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button 
      className={`chat-float-button ${isOpen ? 'open' : ''}`} 
      onClick={onClick}
      aria-label="Toggle chat assistant"
    >
      <svg 
        className="chat-icon"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          // X icon when open
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Chat icon when closed
          <path
            d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        )}
      </svg>
    </button>
  );
}

export default ChatButton;
