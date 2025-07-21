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

export function findLargestNumber(array: number[]): number | undefined {
  if (array.length === 0) return undefined; // Handle empty array gracefully

  let biggest = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > biggest) {
      biggest = array[i];
    }
  }
  return biggest;
}

export function calculateAverage(grades: number[]): string | number {
  let totalGrades = 0;
  for (const grade of grades) {
    totalGrades += grade;
  }

  if (grades.length === 0) {
    return "No grades to calculate.";
  }

  const average = totalGrades / grades.length;
  return average;
}
