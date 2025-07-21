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

// TODO: Implement the following function:

// - Level 4: Managing a task list
// - Create an empty array `taskList` using `let`.
// - Create a function `addTask` that takes a parameter `task` (a string representing a task to be added).

// - Inside the function, add the `task` to the `taskList` array.
// - Use `const` to declare a variable `messageAdded` that contains the string `“Task added: ” + task`.
// - The function must return `messageAdded`.

// - Create a function `supprimerTache` that takes a parameter `index` (the index of the task to be deleted from the array).
// - Check if `index` is a valid number and if it is within the limits of the `listeTaches` array. If not, return an appropriate error string.

// - Delete the task at the specified index from the `listTasks` array.
// - Use `const` to declare a variable `messageDeleted` that contains the string `“Task deleted at index: ” + index`.
// - The function must return `messageDeleted`.

// - Create a function `displayTasks` that takes no parameters.
// - Check if the `taskList` array is empty. If so, return the string `“No tasks to display.”`.

// - Otherwise, use `let` to declare a variable `listeFormatee` that contains a formatted string of all the tasks in `listeTaches`, each on a new line.
// - The function must return `listeFormatee`.
// - Test the functions by adding, deleting, and displaying several tasks, and display the results in the console.
