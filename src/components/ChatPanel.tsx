import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatPanel.css';
import { useData } from '../context/DataContext';
import { logMessage } from '../api';
import { v4 as uuidv4 } from 'uuid';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  id: number;
}

function ChatPanel({ isOpen }: ChatPanelProps) {
  const { clubs, courses } = useData();
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi! I\'m your Mustang Scholar AI Assistant. How can I help you today?', sender: 'bot', id: 1 }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clientId, setClientId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get or create client ID on component mount
    const storedClientId = localStorage.getItem('mustangScholarClientId');
    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      const newClientId = uuidv4();
      localStorage.setItem('mustangScholarClientId', newClientId);
      setClientId(newClientId);
    }
  }, []); // Only run once on mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const generateResponse = async (userInput: string): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05"});
      
      const conversationHistory = messages.map(message => `{${message.sender}: ${message.text}}`).join('\n');
      const clubsInfo = clubs.map(club => `{${club.name} - ${club.description} - Officer: ${club.officer} - Officer Email: ${club.email} - Advisor: ${club.advisor} - Flyer URL: ${club.flyer}}`).join('\n');
      const important = `
IMPORTANT:
If a user asks about club or course information, DO NOT PROVIDE A RESPONSE TO THE USER. Instead, type any relevant tags as your response. For example, if the user asks about clubs, type "<CLUBS>" as your response.
Clubs:
<CLUBS>
Departments:
${[...new Set(courses.map(course => `<${course.department.toUpperCase()}>`))].join('\n')}
`

      let prompt = `You are a helpful assistant for Mustang Scholar, a website that helps high school students find and choose courses and clubs. 
You should provide personalized recommendations and advice about courses and extracurricular activities. Do not start with a greeting.
Keep responses concise and friendly. Ensure all URLs for clubs are embedded in clickable hyperlinks. Use descriptive text for the link instead of displaying the URL as plain text.
Occasionally remind the user that you are an AI assistant, and official decisions should be made by a school counselor. Counselors are not involved in clubs, as they are student-led.
Do not remind the user every message about counselors, only do so when you mention specific courses or decisions. Do not be annoying with this reminder.

This is the current conversation:
${conversationHistory}
{user: ${userInput}}
`;

      console.log(prompt);
      
      let result = await model.generateContent(prompt + important);
      let response = await result.response;
      let responseText = response.text();

      if (responseText.includes('<CLUBS>')) {
        prompt += `\n\nClubs Information:\n${clubsInfo}\n\n`;
      }
      const departmentTags = [...new Set(courses.map(course => `<${course.department.toUpperCase()}>`))];
      for (const tag of departmentTags) {
        if (responseText.includes(tag)) {
          const departmentCourses = courses.filter(course => `<${course.department.toUpperCase()}>` === tag)
            .map(course => `{${course.name} - Description: ${course.description} - Department: ${course.department} - Course Number: ${course.number} - Prerequisites: ${course.prerequisites} - Duration: ${course.duration} - Video Link: ${course.video}}`).join('\n');
          prompt += `\n\nCourses Information for ${tag}:\n${departmentCourses}\n\n`;
        }
      }
      result = await model.generateContent(prompt);
      response = await result.response;
      responseText = response.text();

      return responseText;

    } catch (error) {
      console.error('Error generating response:', error);
      return 'We are currently receiving unusually high demand. Please try again later.';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' as const, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateResponse(inputText);
      const botMessage = { text: botResponse, sender: 'bot' as const, id: Date.now() };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Log the message to Google Sheets with client ID
      await logMessage({
        timestamp: new Date().toISOString(),
        ipAddress: window.location.hostname,
        userMessage: inputText,
        botMessage: botResponse,
        clientId: clientId,
      });
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: "We are currently receiving unusually high demand. Please try again later.",
        sender: 'bot',
        id: Date.now() + 1
      }]);
    }

    setIsTyping(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`chat-panel ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="expand-toggle"
        onClick={toggleExpand}
        aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
      >
        {isExpanded ? '▶' : '◀'}
      </button>
      <div className="chat-panel-content">
        <div className="chat-panel-header">
          <h2>Chat Assistant</h2>
        </div>

        <div className="chat-panel-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender} animate-message`}>
              <div className="message-content">
                <ReactMarkdown>{message.text}</ReactMarkdown>
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
