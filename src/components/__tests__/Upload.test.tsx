import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Upload from '../Upload';
import { BrowserRouter } from 'react-router-dom';

test('renders upload component', () => {
  render(
    <BrowserRouter>
      <Upload />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Upload YAML or ZIP File/i);
  expect(titleElement).toBeInTheDocument();
});

test('handles file selection', () => {
  render(
    <BrowserRouter>
      <Upload />
    </BrowserRouter>
  );
  const fileInput = screen.getByLabelText(/select a file/i);
  const file = new File(['dummy content'], 'test.yaml', { type: 'application/x-yaml' });
  fireEvent.change(fileInput, { target: { files: [file] } });
  expect(fileInput.files[0]).toBe(file);
});