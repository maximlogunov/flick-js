export type Direction = "up" | "down" | "left" | "right";

export type FocusableElement = HTMLElement & { focus: () => void };

export interface FocusManagerOptions {
  onFocusChange?: (element: FocusableElement) => void;
  focusAnimation?: (element: FocusableElement) => void;
  focusOrder?: string[]; // Array of selectors defining the custom focus order
}