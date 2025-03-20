import "@testing-library/jest-dom";
import FocusManager from "../FocusManager";

describe("FocusManager", () => {
  let focusManager: FocusManager;
  let container: HTMLElement;
  let element1: HTMLElement;
  let element2: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <button id="button1">Button 1</button>
      <button id="button2">Button 2</button>
    `;
    document.body.appendChild(container);

    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");

    if (!button1 || !button2) {
      throw new Error("Test elements not found");
    }

    element1 = button1;
    element2 = button2;
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
    focusManager.registerFocusable(element1);
    focusManager.setFocus(element1);
    expect(focusManager.getFocus()).toBe(element1);
  });

  it("should move focus between elements", () => {
    focusManager.registerFocusable(element1);
    focusManager.registerFocusable(element2);

    focusManager.setFocus(element1);
    expect(focusManager.getFocus()).toBe(element1);

    focusManager.moveFocus("right");
    expect(focusManager.getFocus()).toBe(element2);

    focusManager.moveFocus("left");
    expect(focusManager.getFocus()).toBe(element1);
  });

  describe("Focused class management", () => {
    it("should add focused class when setting focus", () => {
      focusManager.registerFocusable(element1);
      focusManager.setFocus(element1);

      expect(element1.classList.contains("focused")).toBe(true);
    });

    it("should remove focused class from previous element when moving focus", () => {
      focusManager.registerFocusable(element1);
      focusManager.registerFocusable(element2);

      focusManager.setFocus(element1);
      expect(element1.classList.contains("focused")).toBe(true);

      focusManager.setFocus(element2);
      expect(element1.classList.contains("focused")).toBe(false);
      expect(element2.classList.contains("focused")).toBe(true);
    });

    it("should use custom focused class name from options", () => {
      const customClass = "custom-focused";
      focusManager = new FocusManager({ focusedClass: customClass });

      focusManager.registerFocusable(element1);
      focusManager.setFocus(element1);

      expect(element1.classList.contains(customClass)).toBe(true);
    });

    it("should remove focused class when unregistering element", () => {
      focusManager.registerFocusable(element1);
      focusManager.setFocus(element1);

      expect(element1.classList.contains("focused")).toBe(true);

      focusManager.unregisterFocusable(element1);
      expect(element1.classList.contains("focused")).toBe(false);
    });

    it("should remove focused class when destroying focus manager", () => {
      focusManager.registerFocusable(element1);
      focusManager.setFocus(element1);

      expect(element1.classList.contains("focused")).toBe(true);

      focusManager.destroy();
      expect(element1.classList.contains("focused")).toBe(false);
    });
  });
});
