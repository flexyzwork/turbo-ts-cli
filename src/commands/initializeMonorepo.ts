import path from 'path';
import {
  createDirIfNotExists,
  writeJsonFile,
  writeFile,
  getPnpmVersion,
} from '../utils';
import { addBasePackage } from './addBasePackage';
import { addApp } from './addApp';

/**
 * Initializes a new Turbo monorepo.
 * @param monorepoName - The name of the monorepo to initialize.
 */
export const initializeMonorepo = (monorepoName: string): void => {
  console.log(`Initializing Turbo monorepo: ${monorepoName}`);

  const pnpmVersion = getPnpmVersion();

  // Root directory setup
  const rootDir = path.join(process.cwd(), monorepoName);
  createDirIfNotExists(rootDir);

  // Create packages and apps directories
  createDirIfNotExists(path.join(rootDir, 'packages'));
  createDirIfNotExists(path.join(rootDir, 'apps'));

  // Create pnpm-workspace.yaml
  writeFile(
    path.join(rootDir, 'pnpm-workspace.yaml'),
    `
packages:
  - "apps/*"
  - "packages/*"
`.trim()
  );

  // Create turbo.json
  writeJsonFile(path.join(rootDir, 'turbo.json'), {
    $schema: 'https://turbo.build/schema.json',
    tasks: {
      build: {
        dependsOn: ['^build'],
        inputs: ['$TURBO_DEFAULT$', '.env*'],
        outputs: ['.next/**', '!.next/cache/**', 'dist'],
      },
      lint: {
        dependsOn: ['^lint'],
      },
      'check-types': {
        dependsOn: ['^check-types'],
      },
      dev: {
        cache: false,
        persistent: true,
      },
    },
  });

  // Create root package.json
  writeJsonFile(path.join(rootDir, 'package.json'), {
    name: monorepoName,
    private: true,
    version: '1.0.0',
    type: 'module',
    packageManager: `pnpm@${pnpmVersion}`, // Dynamically sets the pnpm version
    devDependencies: {
      typescript: '^5',
      turbo: '^2',
      prettier: '^3',
    },
    scripts: {
      build: 'turbo run build',
      dev: 'turbo run dev',
      lint: 'turbo run lint',
      test: 'turbo run test',
    },
    engines: {
      node: '>=18',
    },
  });

  // Create .prettierrc
  writeFile(
    path.join(rootDir, '.prettierrc'),
    `
{
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always"
}
`.trim()
  );

  // Create .prettierignore
  writeFile(path.join(rootDir, '.prettierignore'), `pnpm-lock.yaml`);

  //.vscode
  createDirIfNotExists(path.join(rootDir, '.vscode'));
  writeFile(
    path.join(rootDir, '.vscode', 'settings.json'),
    `
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "typescript.tsdk": "./node_modules/typescript/lib"
}
`.trim()
  );

  // Add a basic README file
  writeFile(
    path.join(rootDir, 'README.md'),
    `
# ${monorepoName}

This is a Turbo monorepo initialized with turbo-ts-cli.

## Structure
- **packages/**: Shared libraries and configurations.
- **apps/**: Application-specific code.

## Commands
- \`pnpm run build\`: Build all packages and apps.
- \`pnpm run lint\`: Lint the code.
- \`pnpm run test\`: Run tests.
`.trim()
  );

  // Add default packages
  const basePackage = ['eslint-config', 'typescript-config', 'docker'];
  basePackage.forEach((pkg) => {
    addBasePackage(pkg, path.join(rootDir, 'packages'));
  });

  const helperPackage = ['db', 'types', 'queue'];
  helperPackage.forEach((pkg) => {
    addApp(pkg, 'package', monorepoName);
  });

  console.log(`Turbo monorepo '${monorepoName}' initialized successfully.`);
};
