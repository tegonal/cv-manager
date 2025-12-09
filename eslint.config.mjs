import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

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
  ...compat.extends('next/core-web-vitals'),
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'import/order': 'off',
    },
  },
  perfectionist.configs['recommended-natural'],
]

export default config
