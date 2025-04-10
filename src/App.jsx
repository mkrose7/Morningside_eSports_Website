import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MatchHistory from './pages/MatchHistory';
import Origins from './pages/Origins';
import Teams from './pages/Teams';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/match-history" element={<MatchHistory />} />
        <Route path="/origins" element={<Origins />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
