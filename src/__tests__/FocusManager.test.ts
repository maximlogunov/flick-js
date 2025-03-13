import { IFocusManager } from "../types";
import { FocusManager } from "../FocusManager";

describe("FocusManager", () => {
  let focusManager: IFocusManager;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    // Create test elements
    ["1", "2", "3"].map((id) => {
      const element = document.createElement("button");
      element.setAttribute("data-focusable", "true");
      element.setAttribute("data-focus-key", `item-${id}`);
      element.textContent = `Item ${id}`;
      container.appendChild(element);
      return element;
    });

    focusManager = new FocusManager();
  });

  afterEach(() => {
    focusManager.destroy();
    document.body.removeChild(container);
  });

  it("should initialize with default options", () => {
    expect(focusManager.getFocus()).toBeNull();
  });

  it("should set focus on element", () => {
    const element = container.querySelector("button");
    if (element) {
      focusManager.setFocus(element);
      expect(focusManager.getFocus()).toBe(element);
    }
  });

  it("should move focus between elements", () => {
    const elements = Array.from(container.querySelectorAll("button"));
    focusManager.setFocus(elements[0]);

    focusManager.moveFocus("right");
    expect(focusManager.getFocus()).toBe(elements[1]);

    focusManager.moveFocus("right");
    expect(focusManager.getFocus()).toBe(elements[2]);

    focusManager.moveFocus("left");
    expect(focusManager.getFocus()).toBe(elements[1]);
  });
});
