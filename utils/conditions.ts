// utils\conditions.ts

export function checkParity(nombre: number): string {
  if (nombre % 2 === 0) {
    return "The number is even.";
  } else {
    return "The number is odd.";
  }
}

export function sumOddNumbers(limit: number): number {
  let sum = 0;
  for (let i = 0; i <= limit; i++) {
    if (i % 2 !== 0) {
      sum += i;
    }
  }
  return sum;
}

// TODO: Implement the following function:

// - Level 3: Where's Nemo?
// - Create a function `findLargestNumber` that takes a parameter `array` (an array of numbers).
// - Use `let` to declare a variable `largest` initialized to the first element of the array.
// - Use a `for` loop to iterate over each element of the array.

// - Inside the loop, use an `if` condition to check if the current element is greater than `bigger`.
// - If so, update `bigger` with that element.
// - The function should return `bigger`.
// - Test the function with different arrays and display the results in the console.
