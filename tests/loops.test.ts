// tests/loops.test.ts

import { describe, it, expect, vi } from "vitest";
import { calculateFactorial, displayEvenNumbers } from "~/utils/loops";

describe("displayEvenNumbers", () => {
  it("should log only even numbers up to the given limit", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayEvenNumbers(6);
    // Expect: 0, 2, 4, 6 to have been logged
    expect(logSpy.mock.calls.flat()).toEqual([0, 2, 4, 6]);
    logSpy.mockRestore();
  });

  it("should not log anything if limit is less than 0", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayEvenNumbers(-1);
    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });
});

describe("calculateFactorial", () => {
  it("should return 1 for n=0", () => {
    expect(calculateFactorial(0)).toBe(1);
  });

  it("should return 1 for n=1", () => {
    expect(calculateFactorial(1)).toBe(1);
  });

  it("should return 120 for n=5", () => {
    expect(calculateFactorial(5)).toBe(120);
  });

  it("should return 3628800 for n=10", () => {
    expect(calculateFactorial(10)).toBe(3628800);
  });

  it("should return 1 for negative n (if you want to handle this gracefully)", () => {
    expect(calculateFactorial(-3)).toBe(1); // Optional: define behavior for negatives
  });
});

// TODO: Test the following function:

// - Level 3: Where's Nemo
// - Create a function `findElement` that takes two parameters: `array` (an array of numbers) and `element` (a number to search for).
// - Use a `for` loop to iterate through each element of the array.

// - If the element is found, use `const` to declare a variable `message` that contains the string `“Element found at index: ” + index`.
// - If the element is not found after the loop, return `“Element not found.”`.
// - The function should display `message` if the element is found.

// - Test the function with different arrays and elements, and display the results in the console.
// - Example data
// - Array: ``[5, 12, 23, 9, 34, 12]``
// - Element to search for: `9`
