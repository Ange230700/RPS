// utils\functions.ts

export function saluer(nom: string): string {
  const message = "Hello, " + nom + "!";
  return message;
}

export function calculateVAT(priceHT: number): number {
  const VATrate = 0.2;
  const priceTTC = priceHT * (1 + VATrate);
  return priceTTC;
}

// TODO: Implement the following function:

// - Level 2: Calculating VAT
// - Create a function `calculateVAT` that takes a parameter `priceHT` (price excluding tax).
// - Inside the function, use `const` to declare a variable `VATrate` with a value of 0.2 (20%).
//     - Calculate the price including tax using the formula `priceHT * (1 + VAT rate)` and store the result in a variable `priceTTC` with `const`.

// - The function must return `prixTTC`.
// - Call the `calculerTVA` function with a price of your choice and display the result in the console.
