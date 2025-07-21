// utils\conditions.ts

export function checkParity(nombre: number): string {
  if (nombre % 2 === 0) {
    return "The number is even.";
  } else {
    return "The number is odd.";
  }
}

// TODO: Implement the following function:

// - Level 1: Parity
// - Create a function `checkParity` that takes a parameter `nombre`.
// - Use an `if` condition to check whether `nombre` is even or odd.

// - If the number is even, return `“The number is even.”`.
// - Otherwise, return `“The number is odd.”`.
// - Call the `checkParity` function with different values and display the results in the console.
