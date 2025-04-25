// filepath: /Users/pedrocandidodesousa/Documents/EDGE/Mustang-Scholar/src/pages/Update.tsx
import { useState } from 'react';
import '../styles/Update.css';

const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL;

function Update() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const correctPassword = 'EngineeringDesignGrowthEmpowerment';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Incorrect password. Please try again.');
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setMessage('Please enter a URL.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Replace this URL with your actual Google App Script URL      
      const response = await fetch(SHEETS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (response.ok) {
        setMessage('URL submitted successfully! This may take us a while, check back in 20 minutes :)');
        setUrl('');
      } else {
        setMessage('Error submitting URL. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-container">
      {!isAuthenticated ? (
        <div className="auth-section">
          <h1 className="gradientText">Secure Access</h1>
          <p>Please enter the password to continue.</p>
          <form onSubmit={handlePasswordSubmit}>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="text-input"
              />
            </div>
            <button type="submit" className="action-button">
              Submit
            </button>
          </form>
          {message && <p className="message error">{message}</p>}
        </div>
      ) : (
        <div className="content-section">
          <h1 className="gradientText">Update System</h1>
          <p>Enter the URL to be processed by the Google App Script.</p>
          <form onSubmit={handleUrlSubmit}>
            <div className="input-group">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="text-input"
              />
            </div>
            <button 
              type="submit" 
              className="action-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit URL'}
            </button>
          </form>
          {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Update;
