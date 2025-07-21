// utils\variables.ts

export function displayNameAndAge(): void {
  const name = "Ange";
  const age = 26;
  console.log("Name:", name);
  console.log("Age:", age);
}

export function displayFullName(): void {
  const firstName = "Ange";
  const lastName = "Kouakou";
  const fullName = firstName + " " + lastName;
  console.log(fullName);
}

export function displayMathOperations(): void {
  const number1 = 8;
  const number2 = 2;

  const sum = number1 + number2;
  const difference = number1 - number2;
  const product = number1 * number2;
  const quotient = number1 / number2;

  console.log("Sum:", sum);
  console.log("Difference:", difference);
  console.log("Product:", product);
  console.log("Quotient:", quotient);
}

export function calculateTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}
