# FlickJS

TypeScript library for focus management in smart TV devices. Supports older smart TV environments and is framework-agnostic.

## Installation

```bash
npm install flickjs
```

## Usage

```typescript
import { FocusManager } from 'flickjs';

// Create focus manager instance
const focusManager = new FocusManager();

// Initialize with optional settings
focusManager.initialize({
  focusableSelector: '[data-focusable]',
  focusableAttribute: 'data-focusable',
  focusKeyAttribute: 'data-focus-key',
  defaultFocusKey: 'main-menu'
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

- `initialize(options?: IFocusManagerOptions): void` - Initialize focus manager
- `setFocus(element: HTMLElement): void` - Set focus on element
- `getFocus(): HTMLElement | null` - Get current focused element
- `moveFocus(direction: 'up' | 'down' | 'left' | 'right'): void` - Move focus in specified direction
- `registerFocusable(element: HTMLElement, focusKey?: string): void` - Register focusable element
- `unregisterFocusable(element: HTMLElement): void` - Unregister focusable element
- `destroy(): void` - Clean up resources

## Supported Keys

- Arrow keys (↑, ↓, ←, →) - Navigation between elements
- Enter - Element activation
- Back - Back button

## License

MIT 