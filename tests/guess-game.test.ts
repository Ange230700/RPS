// tests/guess-game.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderGuessGameTest } from "./helpers";

const riddles = [
  {
    clue: "I have keys but open no locks. I have space but no room. You can enter, but can't go outside. What am I?",
    answer: "keyboard",
  },
  {
    clue: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "candle",
  },
  {
    clue: "What has hands but can’t clap?",
    answer: "clock",
  },
];

describe("Guessing Game UI", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("displays the clue for a randomly selected riddle", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const { app } = renderGuessGameTest();
    expect(app.querySelector("#clue")?.textContent).toContain(riddles[0].clue);
  });

  it("feedback is green and correct when answer is right (case insensitive)", () => {
    vi.spyOn(Math, "random").mockReturnValue(1 / 3); // 1/3 will pick 1 as index
    const { app } = renderGuessGameTest();
    const input = app.querySelector<HTMLInputElement>("#guess-input")!;
    const button = app.querySelector<HTMLButtonElement>("#submit-guess")!;
    input.value = "CANdle";
    button.click();
    const feedback = app.querySelector<HTMLDivElement>("#feedback")!;
    expect(feedback.textContent).toContain("Correct");
    expect(feedback.style.color).toBe("green");
  });

  it("feedback is red and incorrect when answer is wrong", () => {
    vi.spyOn(Math, "random").mockReturnValue(2 / 3);
    const { app } = renderGuessGameTest();
    const input = app.querySelector<HTMLInputElement>("#guess-input")!;
    const button = app.querySelector<HTMLButtonElement>("#submit-guess")!;
    input.value = "spoon";
    button.click();
    const feedback = app.querySelector<HTMLDivElement>("#feedback")!;
    expect(feedback.textContent).toContain("Incorrect");
    expect(feedback.style.color).toBe("red");
  });

  it("does nothing if input is empty (still red, incorrect)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const { app } = renderGuessGameTest();
    const input = app.querySelector<HTMLInputElement>("#guess-input")!;
    const button = app.querySelector<HTMLButtonElement>("#submit-guess")!;
    input.value = "";
    button.click();
    const feedback = app.querySelector<HTMLDivElement>("#feedback")!;
    expect(feedback.textContent).toContain("Incorrect");
    expect(feedback.style.color).toBe("red");
  });

  it("has all required UI elements", () => {
    const { app } = renderGuessGameTest();
    expect(app.querySelector("#clue")).not.toBeNull();
    expect(app.querySelector("#guess-input")).not.toBeNull();
    expect(app.querySelector("#submit-guess")).not.toBeNull();
    expect(app.querySelector("#feedback")).not.toBeNull();
  });
});
