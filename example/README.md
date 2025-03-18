# Flick-js Example

This is an example application demonstrating the usage of `flick-js` library for focus management in smart TV devices.

## Features

- Focus management for TV navigation
- Keyboard navigation support (arrow keys, enter, back)
- React components with focus handling
- TypeScript support

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal.

## Project Structure

- `src/components/Rail` - Component for displaying a horizontal list of items with focus management
- `src/components/ItemDetails` - Component for displaying item details with back navigation
- `src/data/mockdata.ts` - Sample data for the example

## Usage Example

```tsx
import { FocusManager } from 'flick-js';

// Initialize focus manager
const focusManager = new FocusManager({
  focusableSelector: '.focusable-item',
  defaultFocusKey: 'first-item'
});

// Register focusable elements
const element = document.querySelector('.focusable-item');
if (element instanceof HTMLElement) {
  focusManager.registerFocusable(element, 'first-item');
}
```

## Development

This example is built with:
- React
- TypeScript
- Vite
- Flick-js

## License

MIT
