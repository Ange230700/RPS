// tests\functions.test.ts

import { describe, expect, it } from "vitest";
import { saluer } from "~/utils/functions";

describe("saluer", () => {
  it("should return a greeting with the provided name", () => {
    expect(saluer("Ange")).toBe("Hello, Ange!");
    expect(saluer("Alice")).toBe("Hello, Alice!");
    expect(saluer("Bob")).toBe("Hello, Bob!");
  });
});

// TODO: Test the following function:

// - Level 1: Greeting
// - Create a function `saluer` that takes a parameter `nom`.

// - Inside the function, use `const` to declare a variable `message` that contains the string `“Hello, ” + name + “!”`.
// - The function must return the variable `message`.
// - Call the `greet` function with your first name and display the result in the console.
