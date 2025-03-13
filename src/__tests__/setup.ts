import '@testing-library/jest-dom';

// Add support for data-* attributes
Object.defineProperty(HTMLElement.prototype, 'dataset', {
  writable: true,
  configurable: true
}); 