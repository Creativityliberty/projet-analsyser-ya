import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummary } from '../utils/api';
import './Summary.css';

const Summary: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryData = await getSummary();
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setError('Failed to load project summary. Please try again.');
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="summary-container">
      <h1>Project Summary</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <pre>{summary}</pre>
      )}
      <Link to="/modify" className="modify-button">Modify Project</Link>
    </div>
  );
};

export default Summary;