import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';

const nodeRequire = createRequire(import.meta.url);
const ibmPlexRoot = dirname(nodeRequire.resolve('@ibm/plex/package.json'));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(jsx|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      { find: /^~@ibm\/plex/, replacement: ibmPlexRoot }
    ];
    config.css = {
      ...config.css,
      preprocessorOptions: {
        scss: { api: 'modern-compiler' }
      }
    };
    return config;
  }
};

export default config;
