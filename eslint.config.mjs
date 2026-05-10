// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
   rules: {
    // RIGOR TÉCNICO (Activado)
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    
    // ESTILO Y FORMATO (Desactivado/Relajado)
    'semi': 'off',
    '@typescript-eslint/semi': 'off',
    'indent': 'off',
    'quotes': 'off',
    'prettier/prettier': 'off', // Si tienes el plugin de prettier, desactívalo o entrará en conflicto
    'comma-spacing': 'off',
    'no-trailing-spaces': 'off',
  },
  },
);
