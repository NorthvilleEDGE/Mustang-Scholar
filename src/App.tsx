import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Clubs from './pages/Clubs'
import Recommender from './pages/Recommender'
import AboutUs from './pages/AboutUs'
import ChatButton from './components/ChatButton'
import ChatPanel from './components/ChatPanel'
import { DataProvider } from './context/DataContext'


function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/recommender" element={<Recommender />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
        <ChatPanel isOpen={isChatOpen} onClose={toggleChat} />
      </Router>
    </DataProvider>
  )
}

export default App;
