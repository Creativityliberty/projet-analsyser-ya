import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const extractProjectStructure = (rootDir: string, excludeDirs: string[] = ['node_modules', 'vendor', '.git', '__pycache__']): any => {
  const projectStructure: any = { files: {}, technologies: [] };

  const walkSync = (dir: string) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !excludeDirs.includes(file)) {
        walkSync(filePath);
      } else if (stat.isFile()) {
        const relativePath = path.relative(rootDir, filePath);
        const fileExtension = path.extname(file).toLowerCase();
        const fileInfo: any = {
          size_kb: stat.size / 1024.0,
        };

        if (file === 'package.json') {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          fileInfo.content = content;
          const technologies = detectNodejsTechnologies(content);
          fileInfo.technologies = technologies;
          projectStructure.technologies.push(...technologies);
        } else if (['.js', '.ts', '.jsx', '.tsx', '.py', '.php', '.html', '.css', '.rb', '.java', '.cs'].includes(fileExtension)) {
          fileInfo.content = fs.readFileSync(filePath, 'utf-8');
          fileInfo.type = 'code';
        } else if (file === 'README.md') {
          fileInfo.content = fs.readFileSync(filePath, 'utf-8');
          fileInfo.type = 'documentation';
        } else {
          fileInfo.type = 'other';
        }

        projectStructure.files[relativePath] = fileInfo;
      }
    });
  };

  walkSync(rootDir);
  return projectStructure;
};

const detectNodejsTechnologies = (packageJson: any): string[] => {
  const technologies: string[] = [];
  if (packageJson.dependencies) {
    if (packageJson.dependencies.react) technologies.push('React');
    if (packageJson.dependencies.next) technologies.push('Next.js');
    if (packageJson.dependencies.express) technologies.push('Express');
    if (packageJson.dependencies.vue) technologies.push('Vue.js');
  }
  return technologies;
};

export const readYamlFile = (filePath: string): any => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(fileContent);
};

export const writeYamlFile = (filePath: string, data: any): void => {
  const yamlContent = yaml.dump(data);
  fs.writeFileSync(filePath, yamlContent, 'utf-8');
};