import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { extractProjectStructure, readYamlFile } from '../utils/fileUtils';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  try {
    if (fileExtension === '.zip') {
      const extractDir = path.join('uploads', 'extracted');
      fs.mkdirSync(extractDir, { recursive: true });
      // Implement ZIP extraction logic here
      const projectStructure = extractProjectStructure(extractDir);
      // Store projectStructure in session or database
      req.session.projectStructure = JSON.parse(JSON.stringify(projectStructure));
      res.status(200).json({ message: 'ZIP file processed successfully' });
    } else if (['.yaml', '.yml'].includes(fileExtension)) {
      const yamlData = readYamlFile(filePath);
      // Store yamlData in session or database
      req.session.yamlData = JSON.parse(JSON.stringify(yamlData));
      res.status(200).json({ message: 'YAML file processed successfully' });
    } else {
      fs.unlinkSync(filePath); // Remove the uploaded file
      return res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    console.error('Error processing file:', error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Remove the uploaded file if an error occurs
    }
    res.status(500).json({ error: 'An error occurred while processing the file' });
  }
});

// ... (rest of the code remains the same)

export default router;