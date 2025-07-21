// tests\variables.test.ts

import { describe, it, expect, vi } from "vitest";
import {
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

// TODO: Test the following function:

// - Level 3: Math is fantastic
// - Declare two variables `number1` and `number2` with numerical values of your choice.
// - Calculate the sum, difference, product, and quotient of these two numbers and store the results in variables `sum`, `difference`, `product`, and `quotient`.
// - Display the results in the console.
