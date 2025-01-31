import '../styles/ChatButton.css';
import { useState, useEffect } from 'react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  }, []);

  return (
    <div>
      {!isHovered && (
        <div className="chat-notification">
          Try the Mustang Scholar AI Assistant!
        </div>
      )}
      <button 
        className={`chat-float-button ${isOpen ? 'open' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
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
            <image
              href="chaticon.svg"
              width="24"
              height="24"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

export default ChatButton;
