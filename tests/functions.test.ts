// tests\functions.test.ts

import { describe, expect, it } from "vitest";
import { calculateVAT, saluer } from "~/utils/functions";

describe("saluer", () => {
  it("should return a greeting with the provided name", () => {
    expect(saluer("Ange")).toBe("Hello, Ange!");
    expect(saluer("Alice")).toBe("Hello, Alice!");
    expect(saluer("Bob")).toBe("Hello, Bob!");
  });
});

describe("calculateVAT", () => {
  it("should return the correct price including VAT (20%)", () => {
    expect(calculateVAT(100)).toBe(120);
    expect(calculateVAT(50)).toBe(60);
    expect(calculateVAT(0)).toBe(0);
  });

  it("should work with decimal prices", () => {
    expect(calculateVAT(12.5)).toBeCloseTo(15, 5);
    expect(calculateVAT(99.99)).toBeCloseTo(119.988, 5);
  });

  it("should handle negative prices", () => {
    expect(calculateVAT(-10)).toBe(-12);
  });
});

// TODO: Test the following function:

// - Level 2: Calculating VAT
// - Create a function `calculateVAT` that takes a parameter `priceHT` (price excluding tax).
// - Inside the function, use `const` to declare a variable `VATrate` with a value of 0.2 (20%).
//     - Calculate the price including tax using the formula `priceHT * (1 + VAT rate)` and store the result in a variable `priceTTC` with `const`.

// - The function must return `prixTTC`.
// - Call the `calculerTVA` function with a price of your choice and display the result in the console.
