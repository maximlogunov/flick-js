# FlickJS

TypeScript library for focus management in smart TV devices. Supports older smart TV environments and is framework-agnostic.

## Installation

```bash
npm install flick-js
```

## Usage

```typescript
import { FocusManager } from 'flick-js';

// Create focus manager instance with optional settings
const focusManager = new FocusManager({
  focusableSelector: '[data-focusable]',
  focusableAttribute: 'data-focusable',
  focusKeyAttribute: 'data-focus-key',
  focusedClass: 'focused'
});

// Register focusable element
const element = document.querySelector('.menu-item');
focusManager.registerFocusable(element, 'menu-item-1');

// Focus management
focusManager.setFocus(element);
focusManager.moveFocus('right');
```

## API

### FocusManager

Constructor:
- `new FocusManager(options?: IFocusManagerOptions)` - Create focus manager instance with optional settings

Options:
- `focusableSelector`: string (default: '[data-focusable]') - Selector for focusable elements
- `focusableAttribute`: string (default: 'data-focusable') - Attribute name for focusable elements
- `focusKeyAttribute`: string (default: 'data-focus-key') - Attribute name for focus keys
- `focusedClass`: string (default: 'focused') - CSS class added to focused elements

Methods:
- `setFocus(element: HTMLElement): void` - Set focus on element
- `getFocus(): HTMLElement | null` - Get current focused element
- `moveFocus(direction: 'up' | 'down' | 'left' | 'right'): void` - Move focus in specified direction
- `registerFocusable(element: HTMLElement, focusKey?: string): void` - Register focusable element
- `unregisterFocusable(element: HTMLElement): void` - Unregister focusable element
- `destroy(): void` - Clean up resources and remove event listeners

## Supported Keys

- Arrow keys (↑, ↓, ←, →) - Navigation between elements
- Enter - Triggers click event on focused element
- Back - Browser history back

## License

MIT 