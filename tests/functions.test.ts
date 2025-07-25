// tests\functions.test.ts

import { beforeEach, describe, expect, it } from "vitest";
import {
  addTask,
  calculateVAT,
  convertToCelsius,
  convertToFahrenheit,
  displayTasks,
  saluer,
  supprimerTache,
} from "~/utils/functions";

describe("saluer", () => {
  it("should return a greeting with the provided name", () => {
    expect(saluer("Ange")).toBe("Hello, Ange!");
    expect(saluer("Alice")).toBe("Hello, Alice!");
    expect(saluer("Bob")).toBe("Hello, Bob!");
  });
});

describe("calculateVAT", () => {
  it("should return the correct price including VAT (20%)", () => {
    expect(calculateVAT(100)).toBe(120);
    expect(calculateVAT(50)).toBe(60);
    expect(calculateVAT(0)).toBe(0);
  });

  it("should work with decimal prices", () => {
    expect(calculateVAT(12.5)).toBeCloseTo(15, 5);
    expect(calculateVAT(99.99)).toBeCloseTo(119.988, 5);
  });

  it("should handle negative prices", () => {
    expect(calculateVAT(-10)).toBe(-12);
  });
});

describe("convertToFahrenheit", () => {
  it("should convert Celsius to Fahrenheit correctly", () => {
    expect(convertToFahrenheit(0)).toBe(32);
    expect(convertToFahrenheit(100)).toBe(212);
    expect(convertToFahrenheit(-40)).toBe(-40);
    expect(convertToFahrenheit(37)).toBeCloseTo(98.6, 5);
  });
});

describe("convertToCelsius", () => {
  it("should convert Fahrenheit to Celsius correctly", () => {
    expect(convertToCelsius(32)).toBe(0);
    expect(convertToCelsius(212)).toBe(100);
    expect(convertToCelsius(-40)).toBe(-40);
    expect(convertToCelsius(98.6)).toBeCloseTo(37, 5);
  });
});

describe("Task list management", () => {
  beforeEach(() => {
    import("~/utils/functions").then((mod) => {
      mod.taskList.length = 0;
    });
  });

  it("should add a task and return a confirmation message", () => {
    expect(addTask("Test task")).toBe("Task added: Test task");
    expect(displayTasks()).toContain("Test task");
  });

  it("should display tasks with their indices", () => {
    addTask("Task A");
    addTask("Task B");
    expect(displayTasks()).toBe("0: Task A\n1: Task B");
  });

  it("should delete a task by index and return a confirmation", () => {
    addTask("Task 1");
    addTask("Task 2");
    expect(supprimerTache(0)).toBe("Task deleted at index: 0");
    expect(displayTasks()).toBe("0: Task 2");
  });

  it("should return an error if index is invalid (negative or too high)", () => {
    expect(supprimerTache(-1)).toMatch(/Invalid/);
    expect(supprimerTache(999)).toMatch(/Invalid/);
  });

  it("should show 'No tasks to display.' if task list is empty", () => {
    while (true) {
      const tasks = displayTasks();
      if (tasks === "No tasks to display.") break;
      supprimerTache(0);
    }
    expect(displayTasks()).toBe("No tasks to display.");
  });
});
