import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Clubs from './pages/Clubs'
import Recommendations from './pages/Recommendations'
import Testing from './pages/Testing'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
  )
}

export default App;
