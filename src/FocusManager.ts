type FocusableElement = HTMLElement & { focus: () => void };

interface FocusManagerOptions {
  onFocusChange?: (element: FocusableElement) => void;
  focusAnimation?: (element: FocusableElement) => void;
  focusOrder?: string[]; // Array of selectors defining the custom focus order
}

class FocusManager {
  private container: HTMLElement;
  private options: FocusManagerOptions;
  private focusableElements: FocusableElement[];
  private currentFocusIndex: number;

  constructor(container: HTMLElement, options: FocusManagerOptions = {}) {
    this.container = container;
    this.options = options;
    this.focusableElements = [];
    this.currentFocusIndex = -1;

    this.init();
  }

  private init(): void {
    this.focusableElements = this.getFocusableElements(this.container);
    this.sortFocusableElements(); // Sort elements based on custom focus order
    this.addEventListeners();
  }

  private getFocusableElements(container: HTMLElement): FocusableElement[] {
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(
      container.querySelectorAll<FocusableElement>(focusableSelectors)
    );
  }

  private sortFocusableElements(): void {
    if (this.options.focusOrder) {
      // Sort focusable elements based on the custom order provided
      this.focusableElements.sort((a, b) => {
        const aIndex = this.options.focusOrder!.indexOf(
          this.getSelectorForElement(a)
        );
        const bIndex = this.options.focusOrder!.indexOf(
          this.getSelectorForElement(b)
        );

        // If an element is not in the custom order, place it at the end
        return (
          (aIndex === -1 ? Infinity : aIndex) -
          (bIndex === -1 ? Infinity : bIndex)
        );
      });
    }
  }

  private getSelectorForElement(element: FocusableElement): string {
    // Generate a unique selector for the element (e.g., #id, .class, tag)
    if (element.id) {
      return `#${element.id}`;
    } else if (element.classList.length > 0) {
      return `.${Array.from(element.classList).join(".")}`;
    } else {
      return element.tagName.toLowerCase();
    }
  }

  private addEventListeners(): void {
    // Directional key navigation
    this.container.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Pointer (mouse) events for LG TV remote
    this.container.addEventListener(
      "mousemove",
      this.handlePointerMove.bind(this)
    );
    this.container.addEventListener(
      "click",
      this.handlePointerClick.bind(this)
    );
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
      default:
        return;
    }
    event.preventDefault();
  }

  private handlePointerMove(event: MouseEvent): void {
    const target = event.target as FocusableElement;
    if (this.focusableElements.includes(target)) {
      const index = this.focusableElements.indexOf(target);
      this.setFocus(index);
    }
  }

  private handlePointerClick(event: MouseEvent): void {
    const target = event.target as FocusableElement;
    if (this.focusableElements.includes(target)) {
      const index = this.focusableElements.indexOf(target);
      this.setFocus(index);
      target.focus(); // Ensure the element is focused
    }
  }

  private moveFocus(direction: "up" | "down" | "left" | "right"): void {
    const nextIndex = this.calculateNextIndex(direction);
    if (nextIndex !== -1) {
      this.setFocus(nextIndex);
    }
  }

  private calculateNextIndex(
    direction: "up" | "down" | "left" | "right"
  ): number {
    let nextIndex = this.currentFocusIndex;
    switch (direction) {
      case "up":
      case "left":
        nextIndex--;
        break;
      case "down":
      case "right":
        nextIndex++;
        break;
    }

    if (nextIndex < 0) {
      nextIndex = this.focusableElements.length - 1;
    } else if (nextIndex >= this.focusableElements.length) {
      nextIndex = 0;
    }

    return nextIndex;
  }

  private setFocus(index: number): void {
    if (this.currentFocusIndex !== -1) {
      this.focusableElements[this.currentFocusIndex].classList.remove(
        "focused"
      );
    }
    this.currentFocusIndex = index;
    this.focusableElements[this.currentFocusIndex].classList.add("focused");
    this.focusableElements[this.currentFocusIndex].focus();

    if (this.options.onFocusChange) {
      this.options.onFocusChange(
        this.focusableElements[this.currentFocusIndex]
      );
    }

    if (this.options.focusAnimation) {
      this.options.focusAnimation(
        this.focusableElements[this.currentFocusIndex]
      );
    }
  }

  // Force focus on a specific element
  public forceFocus(elementOrSelector: FocusableElement | string): void {
    let element: FocusableElement | null;
    if (typeof elementOrSelector === "string") {
      element =
        this.container.querySelector<FocusableElement>(elementOrSelector);
    } else {
      element = elementOrSelector;
    }

    if (element && this.focusableElements.includes(element)) {
      const index = this.focusableElements.indexOf(element);
      this.setFocus(index);
    } else {
      console.warn("Element is not focusable or not found in the container.");
    }
  }
}

export default FocusManager;
