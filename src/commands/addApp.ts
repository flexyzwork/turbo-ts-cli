import path from 'path';
import { createDirIfNotExists, writeFile, writeJsonFile } from '../utils';

/**
 * Adds a new app to the monorepo.
 * @param monorepoName - The name of the monorepo.
 * @param appName - The name of the app to add.
 * @param type - The type of app to create (next, node, nest, package).
 */
export const addApp = (
  appName: string,
  type: 'next' | 'node' | 'nest' | 'package',
  monorepoName?: string
): void => {
  console.log(`Adding new app: ${appName} (${type})`);

  const repo = type === 'package' ? 'packages' : 'apps';
  let appDir = path.join(process.cwd(), repo, appName);

  if (type === 'package' && monorepoName) {
    console.log(`Monorepo name: ${monorepoName}`);
    appDir = path.join(process.cwd(), monorepoName, repo, appName);
  }

  // Define app directory
  console.log(`App directory: ${appDir}`);
  createDirIfNotExists(appDir);

  // Create a basic package.json for the app
  const packageJson = {
    name: `@${repo}/${appName}`,
    private: true,
    type: 'module',
    version: '1.0.0',
    scripts: {
      build: 'tsup --clean',
      'check-types': 'tsc --noEmit',
      dev: 'tsup --watch & nodemon',
      lint: 'eslint .',
      start: 'node dist/index',
    },
    devDependencies: {
      '@packages/eslint-config': 'workspace:^',
      '@packages/typescript-config': 'workspace:^',
      '@swc/core': '^1',
      nodemon: '^3',
      tsup: '^8',
    },
    nodemonConfig: {
      watch: ['dist'],
      ext: 'js',
      exec: 'node dist/index.js',
    },
  };

  // eslint.config.js
  writeFile(
    path.join(appDir, 'eslint.config.js'),
    `
import eslintConfig from '@packages/eslint-config';
export default [...eslintConfig, { ignores: ['dist/'] }];
`.trim()
  );

  // tsconfig.json
  writeFile(
    path.join(appDir, 'tsconfig.json'),
    `
{
  "extends": "@packages/typescript-config/base.json",
  "compilerOptions": {
    "incremental": true,
    "outDir": "./dist",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "test", "dist"]
}
`.trim()
  );

  // tsup.config.ts
  writeFile(
    path.join(appDir, 'tsup.config.ts'),
    `
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/main.ts'],
  format: ['esm'],
  clean: true,
  sourcemap: true,
});
`.trim()
  );

  // Generate app-specific files based on type
  switch (type) {
    case 'next':
      break;

    case 'node':
      break;

    case 'nest':
      break;

    case 'package':
      break;

    default:
      console.error('Unknown app type.');
      process.exit(1);
  }

  createDirIfNotExists(path.join(appDir, 'src'));
  writeFile(
    path.join(appDir, 'src', 'index.ts'),
    `console.log('Welcome to ${appName}!');`
  );

  if (type === 'package' && appName === 'db') {
    console.log('Adding db package...');
  }

  writeJsonFile(path.join(appDir, 'package.json'), packageJson);

  console.log(`App '${appName}' of type '${type}' added successfully.`);
};
