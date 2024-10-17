import express from 'express';
import session from 'express-session';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import yaml from 'js-yaml';
import JSZip from 'jszip';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { extractProjectStructure } from './src/utils/fileUtils.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

const upload = multer({ dest: 'uploads/' });

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  try {
    if (fileExtension === '.zip') {
      const projectStructure = await handleZipFile(filePath);
      req.session.projectStructure = projectStructure;
      res.json({ message: 'ZIP file processed successfully' });
    } else if (['.yaml', '.yml'].includes(fileExtension)) {
      const yamlData = await handleYamlFile(filePath);
      req.session.yamlData = yamlData;
      res.json({ message: 'YAML file processed successfully' });
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    console.error('Error processing file:', error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({ error: `An error occurred while processing the file: ${error.message}` });
  }
});

async function handleZipFile(filePath) {
  const zip = new JSZip();
  const content = await fs.promises.readFile(filePath);
  const zipContents = await zip.loadAsync(content);
  
  const extractDir = path.join(path.dirname(filePath), 'extracted');
  await fs.promises.mkdir(extractDir, { recursive: true });

  for (const [filename, zipEntry] of Object.entries(zipContents.files)) {
    if (!zipEntry.dir) {
      const content = await zipEntry.async('nodebuffer');
      const filePath = path.join(extractDir, filename);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, content);
    }
  }

  const projectStructure = extractProjectStructure(extractDir);

  await fs.promises.rm(extractDir, { recursive: true, force: true });

  return projectStructure;
}

async function handleYamlFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return yaml.load(content);
}

// ... (implement other routes and helper functions)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});