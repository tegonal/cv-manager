import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import checkFile from 'eslint-plugin-check-file'
import perfectionist from 'eslint-plugin-perfectionist'

const config = [
  {
    ignores: [
      '.next/**',
      '**/node_modules/**',
      'node_modules/**',
      'build/**',
      'dist/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '.prettierrc.mjs',
      'src/app/(payload)/admin/importMap.js',
      'src/migrations/**',
      '**/payload-types.ts',
    ],
  },
  ...nextCoreWebVitals,
  {
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/!(*importMap).{ts,tsx,js,json,css,scss,html,htm}': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  perfectionist.configs['recommended-natural'],
]

export default config
