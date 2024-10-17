import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>YAML AI Creator</h1>
      <h2>for SaaS Business</h2>
      <p>Transform your ideas into structured projects</p>
      <Link to="/upload" className="start-button">Get Started</Link>
    </div>
  );
};

export default Home;