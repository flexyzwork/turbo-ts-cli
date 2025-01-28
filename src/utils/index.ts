import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';


export const getPnpmVersion = (): string => {
  try {
    return execSync('pnpm --version', { encoding: 'utf8' }).trim();
  } catch {
    console.warn('Could not determine pnpm version. Using default.');
    return '9.15.4'; // Fallback version
  }
};

/**
 * Writes a file, creating directories if needed.
 * @param filePath - The full path of the file.
 * @param content - The content to write into the file.
 */
export const writeFile = (filePath: string, content: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
};

/**
 * Writes a JSON object to a file.
 * @param filePath - The full path of the JSON file.
 * @param data - The JSON object to write.
 */
export const writeJsonFile = (filePath: string, data: object): void => {
  writeFile(filePath, JSON.stringify(data, null, 2));
};

/**
 * Creates a directory if it does not exist.
 * @param dirPath - The path of the directory to create.
 */
export const createDirIfNotExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Executes a shell command.
 * @param command - The command to execute.
 * @param options - Optional execution options.
 */
export const runCommand = (
  command: string,
  options: { cwd?: string } = {}
): void => {
  console.log(`Executing: ${command}`);
  execSync(command, { stdio: 'inherit', ...options });
};

/**
 * Executes a shell command and returns the output as a string.
 * @param command - The command to execute.
 * @param options - Optional execution options.
 * @returns The output of the command.
 */
export const runCommandWithResult = (
  command: string,
  options: { cwd?: string } = {}
): string => {
  return execSync(command, { encoding: 'utf-8', ...options }).trim();
};

/**
 * Checks if a file exists at the given path.
 * @param filePath - The path of the file.
 * @returns `true` if the file exists, otherwise `false`.
 */
export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

/**
 * Clears the contents of a directory without removing the directory itself.
 * @param dirPath - The path of the directory.
 */
export const clearDirectory = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.emptyDirSync(dirPath);
  }
};

/**
 * Reads a JSON file and parses it into an object.
 * @param filePath - The path of the JSON file.
 * @returns The parsed JSON object.
 */
export const readJsonFile = (filePath: string): object => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

/**
 * Updates a JSON file by merging it with new data.
 * @param filePath - The path of the JSON file.
 * @param newData - The new data to merge into the existing JSON object.
 */
export const updateJsonFile = (filePath: string, newData: object): void => {
  const currentData = fileExists(filePath) ? readJsonFile(filePath) : {};
  const mergedData = { ...currentData, ...newData };
  writeJsonFile(filePath, mergedData);
};

/**
 * Generates a new file from a template by replacing placeholders.
 * @param templatePath - The path of the template file.
 * @param outputPath - The path to write the generated file.
 * @param variables - An object containing placeholder variables.
 */
export const generateFromTemplate = (
  templatePath: string,
  outputPath: string,
  variables: { [key: string]: string }
): void => {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const content = Object.entries(variables).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), value),
    templateContent
  );
  writeFile(outputPath, content);
};

/**
 * Logs a message with a specific color.
 * @param message - The message to log.
 * @param color - The chalk color function (e.g., chalk.green).
 */
export const logWithColor = (
  message: string,
  color: (msg: string) => string
): void => {
  console.log(color(message));
};
