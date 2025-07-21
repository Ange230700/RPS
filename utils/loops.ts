// utils\loops.ts

export function displayEvenNumbers(limit: number): void {
  for (let i = 0; i <= limit; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}
