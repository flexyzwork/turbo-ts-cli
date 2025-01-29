// eslint.config.js
export const eslintConfigJs = `
import eslintConfig from '@packages/eslint-config';
export default [...eslintConfig, { ignores: ['dist/'] }];
`;

// tsconfig.json
export const tsconfigJson = {
  extends: '@packages/typescript-config/base.json',
  compilerOptions: {
    incremental: true,
    outDir: './dist',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    skipLibCheck: true,
  },
  include: ['src/**/*.ts'],
  exclude: ['node_modules', 'test', 'dist'],
};

// tsup.config.ts
export const tsupConfigTs = `
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/main.ts'],
  format: ['esm'],
  clean: true,
  sourcemap: true,
});
`;

export const dbEnv = (dbName: string) => `
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${dbName}?schema=public
`;

// nestMainTs
export const nestMainTs = `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  console.log('NestJS app is running on http://localhost:4000');
}
bootstrap();`;

// nestAppModuleTs
export const nestAppModuleTs = `
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}`;
