import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../utils/api';
import './Upload.css';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      console.log('Upload response:', response);
      navigate('/summary');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload YAML or ZIP File</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".yaml,.yml,.zip" 
          required 
          aria-label="Select a file"
        />
        <button type="submit" disabled={isLoading || !file}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Upload;