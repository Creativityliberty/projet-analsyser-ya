import React, { useState, useEffect } from 'react';
import { downloadProject } from '../utils/api';

const Download: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('modificationMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleDownload = async () => {
    try {
      await downloadProject();
    } catch (error) {
      console.error('Error downloading project:', error);
    }
  };

  return (
    <div className="download-container">
      <h1>Download Generated Project</h1>
      <h2>Process Steps:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <button onClick={handleDownload}>Download Project</button>
    </div>
  );
};

export default Download;