// tests/loops.test.ts

import { describe, it, expect, vi } from "vitest";
import {
  calculateCompoundInterest,
  calculateFactorial,
  displayEvenNumbers,
  findElement,
} from "~/utils/loops";

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

describe("findElement", () => {
  it("should log and return correct message when element is found", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const arr = [5, 12, 23, 9, 34, 12];
    const result = findElement(arr, 9);
    expect(logSpy).toHaveBeenCalledWith("Element found at index: 3");
    expect(result).toBe("Element found at index: 3");
    logSpy.mockRestore();
  });

  it("should return 'Element not found.' when element does not exist", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const arr = [5, 12, 23, 9, 34, 12];
    const result = findElement(arr, 99);
    expect(logSpy).not.toHaveBeenCalled();
    expect(result).toBe("Element not found.");
    logSpy.mockRestore();
  });

  it("should return 'Element not found.' for empty array", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = findElement([], 1);
    expect(logSpy).not.toHaveBeenCalled();
    expect(result).toBe("Element not found.");
    logSpy.mockRestore();
  });

  it("should find first occurrence if multiple exist", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const arr = [5, 9, 9, 9];
    const result = findElement(arr, 9);
    expect(logSpy).toHaveBeenCalledWith("Element found at index: 1");
    expect(result).toBe("Element found at index: 1");
    logSpy.mockRestore();
  });
});

describe("calculateCompoundInterest", () => {
  it("should calculate compound interest correctly for 1000, 5%, 10 years", () => {
    // 1000 * 1.05^10 ≈ 1628.89
    expect(calculateCompoundInterest(1000, 5, 10)).toBeCloseTo(1628.89, 2);
  });

  it("should return the same initial capital if years = 0", () => {
    expect(calculateCompoundInterest(1000, 5, 0)).toBe(1000);
  });

  it("should handle zero interest rate (no growth)", () => {
    expect(calculateCompoundInterest(2000, 0, 5)).toBe(2000);
  });

  it("should calculate correctly for other values", () => {
    expect(calculateCompoundInterest(1500, 4, 6)).toBeCloseTo(1897.98, 2);
  });

  it("should handle negative interest (depreciation)", () => {
    expect(calculateCompoundInterest(1000, -5, 3)).toBeCloseTo(857.375, 2);
  });
});
