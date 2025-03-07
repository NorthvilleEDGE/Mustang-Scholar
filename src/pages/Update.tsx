import { useState, ChangeEvent } from 'react';
import '../styles/Update.css';

function Update() {
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === 'MustangScholar') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleUpdate = async () => {
    setProgress(0);
    runConverter(); // Call the converter function
  };

  const runConverter = async () => {
    try {
      console.log('Starting converter...');
      const response = await fetch('https://script.google.com/macros/s/AKfycbz-A_vsrKczRw0LeqTaerF1jpGa9gB0PGL8tF52Aebkq8XH0MM2-MLbW6N9EqV0DngDmw/exec'); // Update with your actual endpoint
      const contentType = response.headers.get('content-type');
      const responseText = await response.text();
      console.log('Converter response text:', responseText);
      if (!response.ok) {
        throw new Error('Failed to run converter');
      }
      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(responseText);
        console.log('Converter response:', data);
        setProgress(100); // Assuming the update is complete
      } else {
        console.error('Unexpected response format:', responseText);
      }
    } catch (error) {
      console.error('Error running converter:', error);
    }
  };

  return (
    <div className="update-container">
      {isAuthenticated ? (
        <div className="update-content">
          <h2>Update Page</h2>
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <h2>Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="password-input"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
      )}
    </div>
  );
}

export default Update;