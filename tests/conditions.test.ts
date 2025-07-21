// tests\conditions.test.ts

import { describe, expect, it } from "vitest";
import {
  calculateAverage,
  checkParity,
  findLargestNumber,
  sumOddNumbers,
} from "~/utils/conditions";

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

describe("findLargestNumber", () => {
  it("should return the largest number in an array of positives", () => {
    expect(findLargestNumber([1, 5, 3, 9, 2])).toBe(9);
  });

  it("should return the largest number in an array with negatives", () => {
    expect(findLargestNumber([-10, -5, -3, -20])).toBe(-3);
  });

  it("should return the number itself if array has one element", () => {
    expect(findLargestNumber([42])).toBe(42);
  });

  it("should handle array with all equal elements", () => {
    expect(findLargestNumber([5, 5, 5, 5])).toBe(5);
  });

  it("should return undefined for an empty array", () => {
    expect(findLargestNumber([])).toBeUndefined();
  });
});

describe("calculateAverage", () => {
  it("should return the correct average for a non-empty array", () => {
    expect(calculateAverage([15, 17, 19])).toBe(17);
    expect(calculateAverage([10, 20])).toBe(15);
    expect(calculateAverage([5])).toBe(5);
    expect(calculateAverage([0, 0, 0, 0])).toBe(0);
  });

  it("should handle negative numbers", () => {
    expect(calculateAverage([-10, 10])).toBe(0);
    expect(calculateAverage([-5, -15, -10])).toBe(-10);
  });

  it("should return a float average when necessary", () => {
    expect(calculateAverage([15, 16])).toBe(15.5);
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });

  it('should return "No grades to calculate." for an empty array', () => {
    expect(calculateAverage([])).toBe("No grades to calculate.");
  });
});
