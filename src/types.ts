export interface IFocusableElement {
  element: HTMLElement;
  focusable: boolean;
  tabIndex: number;
  focusKey?: string;
}

export interface IFocusManagerOptions {
  focusableSelector?: string;
  focusableAttribute?: string;
  focusKeyAttribute?: string;
  focusedClass?: string;
  defaultFocusKey?: string;
}

export interface IFocusManager {
  setFocus(element: HTMLElement): void;
  getFocus(): HTMLElement | null;
  moveFocus(direction: FocusDirection): void;
  registerFocusable(element: HTMLElement, focusKey?: string): void;
  unregisterFocusable(element: HTMLElement): void;
  destroy(): void;
}

export type FocusDirection = "up" | "down" | "left" | "right";
