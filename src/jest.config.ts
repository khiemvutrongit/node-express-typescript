import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  maxWorkers: '',
  rootDir: './tests/integration',
  watchAll: false
};
export default config;