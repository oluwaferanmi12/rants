import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/config',
  documents: 'src/**/*.tsx',
  generates: {
    './src/config/graphql/types': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
