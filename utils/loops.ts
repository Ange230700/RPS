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

export function findElement(array: number[], element: number): string {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      const message = "Element found at index: " + i;
      console.log(message);
      return message;
    }
  }
  return "Element not found.";
}

export function calculateCompoundInterest(
  initialCapital: number,
  interestRate: number,
  years: number,
): number {
  let totalAmount = initialCapital;
  for (let i = 0; i < years; i++) {
    totalAmount = totalAmount * (1 + interestRate / 100);
  }
  return totalAmount;
}

// TODO: Implement the following function:
