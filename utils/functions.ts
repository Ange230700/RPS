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

export function convertToFahrenheit(celsius: number): number {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

export function convertToCelsius(fahrenheit: number): number {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

export const taskList: string[] = [];

export function addTask(task: string): string {
  taskList.push(task);
  const messageAdded = "Task added: " + task;
  return messageAdded;
}

export function supprimerTache(index: number): string {
  if (
    typeof index !== "number" ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= taskList.length
  ) {
    return "Invalid index: " + index;
  }
  taskList.splice(index, 1);
  const messageDeleted = "Task deleted at index: " + index;
  return messageDeleted;
}

export function displayTasks(): string {
  if (taskList.length === 0) {
    return "No tasks to display.";
  }
  let listeFormatee = "";
  for (let i = 0; i < taskList.length; i++) {
    listeFormatee += i + ": " + taskList[i];
    if (i < taskList.length - 1) listeFormatee += "\n";
  }
  return listeFormatee;
}
