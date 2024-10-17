import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modifyProject } from '../utils/api';
import './Modify.css';

const Modify: React.FC = () => {
  const [userIdea, setUserIdea] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const messages = await modifyProject(userIdea);
      localStorage.setItem('modificationMessages', JSON.stringify(messages));
      navigate('/download');
    } catch (error) {
      console.error('Error modifying project:', error);
      setError('An error occurred while modifying the project.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modify-container">
      <h1>Enter your ideas or modifications</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userIdea}
          onChange={(e) => setUserIdea(e.target.value)}
          rows={10}
          cols={50}
          required
          placeholder="Describe your ideas or modifications here..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Apply modifications'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Modify;