import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts', // Entry point
  output: {
    file: 'dist/index.js', // Output file
    format: 'iife', // Immediately Invoked Function Expression for older environments
    name: 'FlickJS', // Global variable name
    sourcemap: true // Generate source maps
  },
  plugins: [
    resolve(), // Resolve third-party modules
    commonjs(), // Convert CommonJS modules to ES6
    typescript(), // Compile TypeScript
    babel({ // Transpile to ES5
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**'
    }),
    terser() // Minify the output
  ]
};