// tests\shopping-list.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderShoppingListTest } from "~/tests/helpers";

describe("Shopping List UI", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("starts with empty list", async () => {
    const { app } = await renderShoppingListTest();
    const list = app.querySelectorAll("#shopping-list li");
    expect(list.length).toBe(0);
  });

  it("adds item and displays it", async () => {
    const { app } = await renderShoppingListTest();
    const input = app.querySelector<HTMLInputElement>("#item-input")!;
    const button = app.querySelector<HTMLButtonElement>("#add-item")!;
    input.value = "Bread";
    button.click();
    const items = app.querySelectorAll("#shopping-list li");
    expect(items.length).toBe(1);
    expect(items[0].textContent).toBe("Bread");
    expect(items[0].className).not.toContain("achete");
  });

  it("marks item as purchased on click", async () => {
    const { app } = await renderShoppingListTest();
    const input = app.querySelector<HTMLInputElement>("#item-input")!;
    const button = app.querySelector<HTMLButtonElement>("#add-item")!;
    input.value = "Milk";
    button.click();

    let items = app.querySelectorAll<HTMLLIElement>("#shopping-list li");
    let item = Array.from(items).find((li) => li.textContent === "Milk")!;
    expect(item.className).not.toContain("achete");
    item.click();

    items = app.querySelectorAll<HTMLLIElement>("#shopping-list li");
    item = Array.from(items).find((li) => li.textContent === "Milk")!;
    expect(item.className).toContain("achete");
  });

  it("toggles purchased state on item click", async () => {
    const { app } = await renderShoppingListTest();
    const input = app.querySelector<HTMLInputElement>("#item-input")!;
    const button = app.querySelector<HTMLButtonElement>("#add-item")!;
    input.value = "Eggs";
    button.click();

    let items = app.querySelectorAll<HTMLLIElement>("#shopping-list li");
    let item = Array.from(items).find((li) => li.textContent === "Eggs")!;
    item.click();

    items = app.querySelectorAll<HTMLLIElement>("#shopping-list li");
    item = Array.from(items).find((li) => li.textContent === "Eggs")!;
    expect(item.className).toContain("achete");

    item.click();

    items = app.querySelectorAll<HTMLLIElement>("#shopping-list li");
    item = Array.from(items).find((li) => li.textContent === "Eggs")!;
    expect(item.className).not.toContain("achete");
  });

  it("does not add empty items", async () => {
    const { app } = await renderShoppingListTest();
    const input = app.querySelector<HTMLInputElement>("#item-input")!;
    const button = app.querySelector<HTMLButtonElement>("#add-item")!;
    input.value = "    ";
    button.click();
    expect(app.querySelectorAll("#shopping-list li").length).toBe(0);
  });

  it("logs 'Adding an item' and input value on click", async () => {
    const { app } = await renderShoppingListTest();
    const logSpy = vi.spyOn(console, "log");
    const input = app.querySelector<HTMLInputElement>("#item-input")!;
    const button = app.querySelector<HTMLButtonElement>("#add-item")!;
    input.value = "Apples";
    button.click();
    expect(logSpy).toHaveBeenCalledWith("Adding an item");
    expect(logSpy).toHaveBeenCalledWith("Apples");
  });
});
