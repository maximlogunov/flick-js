import { IFocusableElement, IFocusManagerOptions, FocusDirection, IFocusManager } from './types';

export class FocusManager implements IFocusManager {
  private focusableElements: Record<string, IFocusableElement> = {};
  private currentFocus: HTMLElement | null = null;
  private options: IFocusManagerOptions = {
    focusableSelector: '[data-focusable]',
    focusableAttribute: 'data-focusable',
    focusKeyAttribute: 'data-focus-key'
  };

  private boundHandleKeyDown!: (event: KeyboardEvent) => void;

  initialize(options?: IFocusManagerOptions): void {
    this.options = this.mergeOptions(this.options, options || {});
    this.setupKeyboardListeners();
    this.setupFocusableElements();
  }

  private setupKeyboardListeners(): void {
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.boundHandleKeyDown);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveFocus('up');
        break;
      case 'ArrowDown':
        this.moveFocus('down');
        break;
      case 'ArrowLeft':
        this.moveFocus('left');
        break;
      case 'ArrowRight':
        this.moveFocus('right');
        break;
      case 'Enter':
        this.handleEnterKey();
        break;
      case 'Back':
        this.handleBackKey();
        break;
    }
  }

  private setupFocusableElements(): void {
    var selector = this.options.focusableSelector || '[data-focusable]';
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element instanceof HTMLElement) {
        this.registerFocusable(element);
      }
    }
  }

  setFocus(element: HTMLElement): void {
    const elementId = this.getElementId(element);
    if (this.focusableElements[elementId]) {
      this.currentFocus = element;
      element.focus();
    }
  }

  getFocus(): HTMLElement | null {
    return this.currentFocus;
  }

  moveFocus(direction: FocusDirection): void {
    if (!this.currentFocus) {
      const firstFocusable = this.getFirstFocusableElement();
      if (firstFocusable) {
        this.setFocus(firstFocusable);
      }
      return;
    }

    const nextElement = this.findNextFocusableElement(direction);
    if (nextElement) {
      this.setFocus(nextElement);
    }
  }

  private findNextFocusableElement(direction: FocusDirection): HTMLElement | null {
    var elements = Object.keys(this.focusableElements).map(function(this: FocusManager, key: string) {
      return this.focusableElements[key].element;
    }.bind(this));
    if (!this.currentFocus) return null;
    var currentIndex = elements.indexOf(this.currentFocus);
    
    // Simple implementation - can be improved with element geometry consideration
    var nextIndex: number;
    switch (direction) {
      case 'right':
        nextIndex = (currentIndex + 1) % elements.length;
        break;
      case 'left':
        nextIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
        break;
      case 'down':
        nextIndex = (currentIndex + 1) % elements.length;
        break;
      case 'up':
        nextIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
        break;
    }

    return elements[nextIndex];
  }

  private getFirstFocusableElement(): HTMLElement | null {
    const elements = Object.values(this.focusableElements).map(item => item.element);
    return elements[0] || null;
  }

  registerFocusable(element: HTMLElement, focusKey?: string): void {
    const elementId = this.getElementId(element);
    if (!this.focusableElements[elementId]) {
      const focusableElement: IFocusableElement = {
        element,
        focusable: true,
        tabIndex: -1,
        focusKey: focusKey || undefined
      };
      this.focusableElements[elementId] = focusableElement;
      element.setAttribute(this.options.focusableAttribute!, 'true');
      if (focusKey) {
        element.setAttribute(this.options.focusKeyAttribute!, focusKey);
      }
    }
  }

  unregisterFocusable(element: HTMLElement): void {
    const elementId = this.getElementId(element);
    if (this.focusableElements[elementId]) {
      delete this.focusableElements[elementId];
      element.removeAttribute(this.options.focusableAttribute!);
      element.removeAttribute(this.options.focusKeyAttribute!);
    }
  }

  private handleEnterKey(): void {
    if (this.currentFocus) {
      this.currentFocus.click();
    }
  }

  private handleBackKey(): void {
    // Back button implementation - can be customized for specific needs
    window.history.back();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.boundHandleKeyDown);
    this.focusableElements = {};
    this.currentFocus = null;
  }

  private getElementId(element: HTMLElement): string {
    var focusId = element.getAttribute('data-focus-id');
    if (!focusId) {
      focusId = `focus_${Math.random().toString(36).substr(2, 9)}`;
      element.setAttribute('data-focus-id', focusId);
    }
    return focusId;
  }

  private mergeOptions(target: IFocusManagerOptions, source: IFocusManagerOptions): IFocusManagerOptions {
    const result: IFocusManagerOptions = {};
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        result[key as keyof IFocusManagerOptions] = target[key as keyof IFocusManagerOptions];
      }
    }
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key as keyof IFocusManagerOptions] = source[key as keyof IFocusManagerOptions];
      }
    }
    return result;
  }
} 