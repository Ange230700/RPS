// tests\variables.test.ts

import { describe, it, expect, vi } from "vitest";
import { displayFullName, displayNameAndAge } from "~/utils/variables";

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

// TODO: Test the following function:

// - Level 2: Merge!
// - Declare two variables `firstName` and `lastName` with your first and last names.
// - Concatenate these two variables to form your full name and store the result in a variable `fullName`.
// - Display `fullName` in the console.
