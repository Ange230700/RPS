// tests\setup.ts

import { expect, vi, afterEach, beforeEach } from "vitest";

expect.extend({
  toHaveTextContent(received: HTMLElement, text: string) {
    const pass = received.textContent?.includes(text);
    if (pass) {
      return {
        message: () => `expected element not to contain ${text}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to contain ${text}`,
        pass: false,
      };
    }
  },
});

beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});
