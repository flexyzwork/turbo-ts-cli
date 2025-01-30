import path from 'path';
import { createDirIfNotExists, writeJsonFile, writeFile } from '../utils';
import { baseJson, dockerComposeYaml, indexJs } from '../contents/basePackage';

/**
 * Adds a new shared package to the monorepo.
 * @param packageName - The name of the package to add.
 * @param packagesDir - The directory where the package will be created.
 * @param dbName - The name of the database to use. Defaults to 'postgres'.
 */
export const addBasePackage = (
  packageName: string,
  packagesDir: string,
  dbName: string
): void => {
  console.log(`Adding new package: ${packageName}`);

  // Define package directory
  const packageDir = path.join(packagesDir, packageName);
  createDirIfNotExists(packageDir);

  // Create package.json for the package
  const packageJson: Record<string, any> = {
    name: `@packages/${packageName}`,
    private: true,
    type: 'module',
    version: '1.0.0',
    exports: {},
    publishConfig: {},
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  if (packageName === 'typescript-config') {
    packageJson.devDependencies['@tsconfig/node20'] = '^20.1.4';
    packageJson.exports['./base.json'] = './base.json';
    packageJson.publishConfig.access = 'public';
    writeFile(path.join(packageDir, 'base.json'), baseJson);
  }

  if (packageName === 'eslint-config') {
    packageJson.devDependencies['@eslint/js'] = '^9';
    packageJson.devDependencies.eslint = '^9';
    packageJson.devDependencies.globals = '^15';
    packageJson.devDependencies['typescript-eslint'] = '^8';
    packageJson.exports['.'] = './index.js';
    writeFile(path.join(packageDir, 'index.js'), indexJs);
  }

  if (packageName === 'docker') {
    packageJson.scripts.dev = 'docker compose up';
    packageJson.scripts['db:reset'] =
      'docker compose rm --force --stop postgres && docker compose up -d';
    writeFile(path.join(packageDir, 'docker-compose.yml'), dockerComposeYaml(dbName));
  }

  writeJsonFile(path.join(packageDir, 'package.json'), packageJson);

  console.log(`Package '${packageName}' added successfully.`);
};
