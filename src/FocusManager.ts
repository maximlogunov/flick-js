import {
  IFocusableElement,
  IFocusManagerOptions,
  FocusDirection,
  IFocusManager,
} from "./types";

export class FocusManager implements IFocusManager {
  private focusableElements: Record<string, IFocusableElement> = {};
  private currentFocus: HTMLElement | null = null;
  private options: IFocusManagerOptions = {
    focusableSelector: "[data-focusable]",
    focusableAttribute: "data-focusable",
    focusKeyAttribute: "data-focus-key",
  };

  private boundHandleKeyDown = this.handleKeyDown.bind(this);

  constructor(options?: IFocusManagerOptions) {
    this.options = this.mergeOptions(this.options, options ?? {});
    this.setupKeyboardListeners();
    this.setupFocusableElements();
  }

  private setupKeyboardListeners(): void {
    document.addEventListener("keydown", this.boundHandleKeyDown);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        this.moveFocus("up");
        break;
      case "ArrowDown":
        this.moveFocus("down");
        break;
      case "ArrowLeft":
        this.moveFocus("left");
        break;
      case "ArrowRight":
        this.moveFocus("right");
        break;
      case "Enter":
        this.handleEnterKey();
        break;
      case "Back":
        this.handleBackKey();
        break;
    }
  }

  private setupFocusableElements(): void {
    const selector = this.options.focusableSelector ?? "[data-focusable]";
    const elements = document.querySelectorAll(selector);
    Array.from(elements).forEach((element) => {
      if (element instanceof HTMLElement) {
        this.registerFocusable(element);
      }
    });
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

  private findNextFocusableElement(
    direction: FocusDirection,
  ): HTMLElement | null {
    const elements = Object.values(this.focusableElements).map(
      (item) => item.element,
    );
    if (!this.currentFocus) return null;

    const currentIndex = elements.indexOf(this.currentFocus);
    const lastIndex = elements.length - 1;

    const nextIndex = {
      right: (currentIndex + 1) % elements.length,
      left: currentIndex === 0 ? lastIndex : currentIndex - 1,
      down: (currentIndex + 1) % elements.length,
      up: currentIndex === 0 ? lastIndex : currentIndex - 1,
    }[direction];

    return elements[nextIndex] ?? null;
  }

  private getFirstFocusableElement(): HTMLElement | null {
    const [firstElement] = Object.values(this.focusableElements).map(
      (item) => item.element,
    );
    return firstElement ?? null;
  }

  registerFocusable(element: HTMLElement, focusKey?: string): void {
    const elementId = this.getElementId(element);
    if (!this.focusableElements[elementId]) {
      const focusableElement: IFocusableElement = {
        element,
        focusable: true,
        tabIndex: -1,
        focusKey,
      };
      this.focusableElements[elementId] = focusableElement;
      element.setAttribute(
        this.options.focusableAttribute ?? "data-focusable",
        "true",
      );
      if (focusKey) {
        element.setAttribute(
          this.options.focusKeyAttribute ?? "data-focus-key",
          focusKey,
        );
      }
    }
  }

  unregisterFocusable(element: HTMLElement): void {
    const elementId = this.getElementId(element);
    if (this.focusableElements[elementId]) {
      delete this.focusableElements[elementId];
      element.removeAttribute(
        this.options.focusableAttribute ?? "data-focusable",
      );
      element.removeAttribute(
        this.options.focusKeyAttribute ?? "data-focus-key",
      );
    }
  }

  private handleEnterKey(): void {
    this.currentFocus?.click();
  }

  private handleBackKey(): void {
    window.history.back();
  }

  destroy(): void {
    document.removeEventListener("keydown", this.boundHandleKeyDown);
    this.focusableElements = {};
    this.currentFocus = null;
  }

  private getElementId(element: HTMLElement): string {
    const focusId = element.getAttribute("data-focus-id");
    if (!focusId) {
      const newId = `focus_${Math.random().toString(36).slice(2, 11)}`;
      element.setAttribute("data-focus-id", newId);
      return newId;
    }
    return focusId;
  }

  private mergeOptions(
    target: IFocusManagerOptions,
    source: IFocusManagerOptions,
  ): IFocusManagerOptions {
    return { ...target, ...source };
  }
}
