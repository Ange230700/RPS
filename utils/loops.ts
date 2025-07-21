// utils\loops.ts

export function displayEvenNumbers(limit: number): void {
  for (let i = 0; i <= limit; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}

export function calculateFactorial(n: number): number {
  let factorial = 1;
  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }
  return factorial;
}

// TODO: Implement the following function:

// - Level 3: Where's Nemo
// - Create a function `findElement` that takes two parameters: `array` (an array of numbers) and `element` (a number to search for).
// - Use a `for` loop to iterate through each element of the array.

// - If the element is found, use `const` to declare a variable `message` that contains the string `“Element found at index: ” + index`.
// - If the element is not found after the loop, return `“Element not found.”`.
// - The function should display `message` if the element is found.

// - Test the function with different arrays and elements, and display the results in the console.
// - Example data
// - Array: ``[5, 12, 23, 9, 34, 12]``
// - Element to search for: `9`
