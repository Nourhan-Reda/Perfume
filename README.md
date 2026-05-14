VYRA: Luxury Fragrance House & E-Commerce Ecosystem VYRA is a high-end digital editorial and e-commerce platform designed to bridge the gap between technical olfactory science and cinematic luxury retail. Built with a "less is more" aesthetic, the platform serves as a bespoke authority for fragrance enthusiasts and collectors.

Core Innovation & Key Competencies: Modern Tech Stack: Developed using React 18, TypeScript, and Tailoid CSS within a modular, scalable architecture.

Advanced UX/UI: Engineered with a focus on High-End Minimalist Aesthetics, featuring symmetrical grid layouts, smooth motion transitions, and high-fidelity editorial imagery.

Bespoke Functionality: Includes a custom AI Concierge for fragrance consultations, real-time Inventory Management for limited-edition releases, and a secure Master Curator Admin Suite.

State Management: Implemented robust data handling using React Context API and React-Router-Dom for seamless, single-page navigation.

Industry Authority: Centralized "Olfactory Insights" blog grid, delivering professional-grade content on scent chemistry, longevity, and preservation.

The Vision: To redefine the luxury fragrance market by delivering a seamless, secure, and visually immersive digital boutique that honors the heritage of artisan perfumery.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel (or oxc when used in rolldown-vite) for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
React Compiler
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see this documentation.

Expanding the ESLint configuration
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
You can also install eslint-plugin-react-x and eslint-plugin-react-dom for React-specific lint rules:

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])



"# VYRA"
