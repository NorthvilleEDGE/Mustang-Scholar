import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatPanel.css';
import { useData } from '../context/DataContext';
import { logMessage } from '../api';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';

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
  const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
  
  const client = new OpenAI({
    apiKey: GROK_API_KEY,
    baseURL: 'https://api.x.ai/v1',
    dangerouslyAllowBrowser: true,
  });

  const { clubs, courses } = useData();
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi! I\'m your Mustang Scholar AI Assistant. How can I help you today?', sender: 'bot', id: 1 }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping] = useState(false);
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

  const generateResponse = async (userInput: string, botMessageId: number): Promise<void> => {
    try {
      const conversationHistory = messages.map(message => `{${message.sender}: ${message.text}}`).join('\n');
      const clubsInfo = clubs.map(club => `{${club.name} - ${club.description} - Officer: ${club.officer} - Officer Email: ${club.email} - Advisor: ${club.advisor} - Flyer URL: ${club.flyer}}`).join('\n');
      
      // Create a list of all course names and club names for pattern matching
      const courseNames = courses.map(course => course.name);
      const coursePatterns = courseNames.map(name => `<${name.toUpperCase().replace(/\s+/g, '_')}>`);
      
      const clubNames = clubs.map(club => club.name);
      const clubPatterns = clubNames.map(name => `<CLUB_${name.toUpperCase().replace(/\s+/g, '_')}>`);
      
      const important = `
IMPORTANT:
If a user asks about club or course information, DO NOT PROVIDE A RESPONSE TO THE USER. Instead, type any relevant tags as your response.

If asking about clubs, type "<CLUBS>" as your response.
If asking about specific clubs, use the club tags below.
If asking about specific courses, use the course tags below.

Available Course Tags:
${coursePatterns.join('\n')}

Available Club Tags:
${clubPatterns.join('\n')}
`

      let prompt = `You are a helpful assistant for Mustang Scholar, a website that helps high school students find and choose courses and clubs. 

CRITICAL INSTRUCTIONS:
1. ONLY provide information that is explicitly present in the club and course information sections.
2. If you are unsure about ANY detail, state "I don't have that specific information" rather than making assumptions.
3. NEVER make assumptions about:
   - Meeting times or locations
   - Future events or activities
   - Requirements or prerequisites (unless explicitly stated)
   - Contact information not provided
   - Any details not directly given in the data
4. When mentioning URLs or links:
   - ONLY use URLs that are explicitly provided in the club or course information
   - Format them as clickable markdown links
   - Never create or assume URLs
5. If a user asks about something not covered in the provided data:
   - Clearly state that you don't have that information
   - Suggest they contact the relevant club officer or advisor (if their contact info is provided)
   - Or recommend they speak with their counselor for course-related questions

Keep responses concise and friendly. Only include URLs that you got from the club or course information sections.
Occasionally remind the user that you are an AI assistant, and official decisions should be made by a school counselor. Counselors are not involved in clubs, as they are student-led.
Do not remind the user every message about counselors, only do so when you mention specific courses or decisions.

This is the current conversation:
${conversationHistory}
{user: ${userInput}}
`;

      const stream = await client.chat.completions.create({
        model: 'grok-3-mini-latest',
        messages: [
          {
            role: "system",
            content: prompt + important
          },
          {
            role: "user",
            content: userInput
          }
        ],
        stream: true,
        temperature: 0,
      });

      let fullResponse = '';
      let currentResponse = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        currentResponse += content;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: currentResponse } : msg
        ));
      }

      // Check if we need to add club information or course information
      let needsReprompt = false;
      
      if (fullResponse.includes('<CLUBS>')) {
        prompt += `\n\nClubs Information:\n${clubsInfo}\n\n`;
        needsReprompt = true;
      }

      // Check for any specific club tags in the response
      const matchedClubs = clubPatterns.filter(pattern => 
        fullResponse.includes(pattern)
      ).map(pattern => 
        pattern.slice(6, -1).replace(/_/g, ' ').toLowerCase()
      );

      if (matchedClubs.length > 0) {
        const clubDetails = clubs
          .filter(club => matchedClubs.includes(club.name.toLowerCase()))
          .map(club => `{${club.name} - ${club.description} - Officer: ${club.officer} - Officer Email: ${club.email} - Advisor: ${club.advisor} - Flyer URL: ${club.flyer}}`)
          .join('\n');
        
        prompt += `\n\nSpecific Club Information:\n${clubDetails}\n\n`;
        needsReprompt = true;
      }

      // Check for any course tags in the response
      const matchedCourses = coursePatterns.filter(pattern => 
        fullResponse.includes(pattern)
      ).map(pattern => 
        pattern.slice(1, -1).replace(/_/g, ' ').toLowerCase()
      );

      if (matchedCourses.length > 0) {
        const courseDetails = courses
          .filter(course => matchedCourses.includes(course.name.toLowerCase()))
          .map(course => `{${course.name} - Description: ${course.description} - Department: ${course.department} - Course Number: ${course.number} - Prerequisites: ${course.prerequisites} - Duration: ${course.duration} - Video Link: ${course.video}}`)
          .join('\n');
        
        prompt += `\n\nCourse Information:\n${courseDetails}\n\n`;
        needsReprompt = true;
      }

      if (needsReprompt) {
        currentResponse = '';
        const secondStream = await client.chat.completions.create({
          model: 'grok-2-latest',
          messages: [
            {
              role: "system",
              content: prompt
            },
            {
              role: "user",
              content: userInput
            }
          ],
          stream: true,
          temperature: 0,
        });

        for await (const chunk of secondStream) {
          const content = chunk.choices[0]?.delta?.content || '';
          currentResponse += content;
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId ? { ...msg, text: currentResponse } : msg
          ));
        }
      }

    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' as const, id: Date.now() };
    const botMessageId = Date.now() + 1;
    
    // Add both messages immediately
    setMessages(prev => [...prev, 
      userMessage,
      { text: '', sender: 'bot', id: botMessageId }
    ]);
    
    setInputText('');
    
    try {
      await generateResponse(inputText, botMessageId);

      // Get the updated messages to find the bot's response
      const updatedMessages = await new Promise<Message[]>(resolve => {
        setMessages(prev => {
          resolve(prev);
          return prev;
        });
      });
      const botResponse = updatedMessages.find(msg => msg.id === botMessageId)?.text || '';

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
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, text: "We are experiencing unusually high demand. Please try again later. If this persists, please contact us through the feedback page." }
          : msg
      ));
    }
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
