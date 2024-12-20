import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Clubs from './pages/Clubs'
import Recommendations from './pages/Recommendations'
import AboutUs from './pages/AboutUs'
import ChatButton from './components/ChatButton'
import ChatPanel from './components/ChatPanel'


function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
      <ChatPanel isOpen={isChatOpen} onClose={toggleChat} />
    </Router>
  )
}

export default App;
