// tests\conditions.test.ts

import { describe, expect, it } from "vitest";
import { checkParity } from "~/utils/conditions";

describe("checkParity", () => {
  it("should return 'The number is even.' for even numbers", () => {
    expect(checkParity(2)).toBe("The number is even.");
    expect(checkParity(0)).toBe("The number is even.");
    expect(checkParity(-4)).toBe("The number is even.");
  });

  it("should return 'The number is odd.' for odd numbers", () => {
    expect(checkParity(3)).toBe("The number is odd.");
    expect(checkParity(-1)).toBe("The number is odd.");
    expect(checkParity(15)).toBe("The number is odd.");
  });
});

// TODO: Test the following function:

// - Level 1: Parity
// - Create a function `checkParity` that takes a parameter `nombre`.
// - Use an `if` condition to check whether `nombre` is even or odd.

// - If the number is even, return `“The number is even.”`.
// - Otherwise, return `“The number is odd.”`.
// - Call the `checkParity` function with different values and display the results in the console.
