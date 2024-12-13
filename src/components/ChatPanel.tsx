import React, { useState, useEffect, useRef } from 'react';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatPanelStyle.css';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  id: number;
}

function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi! I\'m your Mustang Scholar Assistant. How can I help you today?', sender: 'bot', id: 1 }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' as const, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse = {
      text: "I'm still under development, but I'll be able to help you with course and club recommendations soon!",
      sender: 'bot' as const,
      id: Date.now() + 1
    };
    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  return (
    <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
      <div className="chat-panel-content">
        <div className="chat-panel-header">
          <h2>Chat Assistant</h2>
        </div>

        <div className="chat-panel-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender} animate-message`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-panel-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;
