// tests\conditions.test.ts

import { describe, expect, it } from "vitest";
import { checkParity, sumOddNumbers } from "~/utils/conditions";

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

describe("sumOddNumbers", () => {
  it("should return 0 for limit=0", () => {
    expect(sumOddNumbers(0)).toBe(0);
  });

  it("should sum all odd numbers up to the given limit (inclusive)", () => {
    expect(sumOddNumbers(7)).toBe(16);
    expect(sumOddNumbers(10)).toBe(25);
    expect(sumOddNumbers(1)).toBe(1);
    expect(sumOddNumbers(2)).toBe(1);
  });

  it("should return 0 for negative limits", () => {
    expect(sumOddNumbers(-5)).toBe(0);
  });
});

// TODO: Test the following function:

// - Level 3: Where's Nemo?
// - Create a function `findLargestNumber` that takes a parameter `array` (an array of numbers).
// - Use `let` to declare a variable `largest` initialized to the first element of the array.
// - Use a `for` loop to iterate over each element of the array.

// - Inside the loop, use an `if` condition to check if the current element is greater than `bigger`.
// - If so, update `bigger` with that element.
// - The function should return `bigger`.
// - Test the function with different arrays and display the results in the console.
