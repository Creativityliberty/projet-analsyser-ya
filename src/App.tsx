import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Summary from './components/Summary';
import Modify from './components/Modify';
import Download from './components/Download';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;