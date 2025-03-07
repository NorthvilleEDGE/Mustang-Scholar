import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Clubs from './pages/Clubs'
import Planner from './pages/Planner'
import AboutUs from './pages/AboutUs'
import ChatButton from './components/ChatButton'
import ChatPanel from './components/ChatPanel'
import { DataProvider } from './context/DataContext'
import { ThemeProvider } from './context/ThemeContext'
import Feedback from './pages/Feedback';
import Update from './pages/Update';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Header />
          <div className="responsive-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/update" element={<Update />} />
            </Routes>
          </div>
          <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
          <ChatPanel isOpen={isChatOpen} onClose={toggleChat} />
        </Router>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App;
