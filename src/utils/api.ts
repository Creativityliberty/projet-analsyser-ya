const API_BASE_URL = '/api';

export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof Error) {
      throw new Error(`Upload failed: ${error.message}`);
    } else {
      throw new Error('Upload failed: Unknown error');
    }
  }
};

// ... (rest of the file remains unchanged)