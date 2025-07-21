// tests\variables.test.ts

import { describe, it, expect, vi } from "vitest";
import {
  calculateTotal,
  displayFullName,
  displayMathOperations,
  displayNameAndAge,
} from "~/utils/variables";

describe("displayNameAndAge", () => {
  it("should log name and age correctly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayNameAndAge();

    expect(logSpy).toHaveBeenCalledWith("Name:", "Ange");
    expect(logSpy).toHaveBeenCalledWith("Age:", 26);

    logSpy.mockRestore();
  });
});

describe("displayFullName", () => {
  it("should log the full name", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayFullName();

    expect(logSpy).toHaveBeenCalledWith("Ange Kouakou");

    logSpy.mockRestore();
  });
});

describe("displayMathOperations", () => {
  it("should log sum, difference, product, and quotient of the two numbers", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayMathOperations();

    expect(logSpy).toHaveBeenCalledWith("Sum:", 10);
    expect(logSpy).toHaveBeenCalledWith("Difference:", 6);
    expect(logSpy).toHaveBeenCalledWith("Product:", 16);
    expect(logSpy).toHaveBeenCalledWith("Quotient:", 4);

    logSpy.mockRestore();
  });
});

describe("calculateTotal", () => {
  it("should return the correct total price", () => {
    expect(calculateTotal(10, 5)).toBe(50);
    expect(calculateTotal(0, 5)).toBe(0);
    expect(calculateTotal(7.5, 3)).toBe(22.5);
    expect(calculateTotal(12.5, 4)).toBe(50);
  });

  it("should handle negative quantities or unit prices", () => {
    expect(calculateTotal(-10, 5)).toBe(-50);
    expect(calculateTotal(10, -5)).toBe(-50);
    expect(calculateTotal(-10, -5)).toBe(50);
  });
});
