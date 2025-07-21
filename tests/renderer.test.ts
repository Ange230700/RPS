// tests\renderer.test.ts

import { describe, it, expect, vi } from "vitest";
import { renderGame } from "~/tests/helpers";
import { GameRenderer } from "~/src/GameRenderer";

describe("GameRenderer", () => {
  it("renders initial UI with header, moves, and score", () => {
    const { app } = renderGame();
    expect(app.innerHTML).toContain("Rock Paper Scissors");
    expect(app.innerHTML).toContain("You: 0");
    expect(app.querySelectorAll(".move-btn").length).toBe(3);
  });

  it("calls onMove callback when move button clicked", () => {
    const { app, moves } = renderGame();
    const btns = app.querySelectorAll<HTMLButtonElement>(".move-btn");
    btns[1].click();
    expect(moves.length).toBe(1);
    expect(["rock", "paper", "scissors"]).toContain(moves[0]);
  });

  it("shows history and updates after each move", () => {
    const { app, game, renderer } = renderGame();
    game.playRound("rock", "scissors");
    renderer.render();
    expect(app.innerHTML).toContain(
      "You chose <b>rock</b>, Computer chose <b>scissors</b>",
    );
    expect(app.innerHTML).toContain("Player wins");
    expect(app.innerHTML).toContain("Round-by-round history");
  });

  it("renders game end panel when finished", () => {
    const { app, game, renderer } = renderGame();
    game.playRound("rock", "scissors");
    game.playRound("rock", "scissors");
    renderer.render();
    expect(app.innerHTML).toContain("You win the series");
    expect(app.querySelector("#restart-btn")).not.toBeNull();
  });

  it("allows changing rounds at end panel", () => {
    // Simulate finished game and check changing rounds works
    const { app, game, renderer } = renderGame();
    game.finished = true;
    renderer.render();
    const roundsInput = app.querySelector<HTMLInputElement>("#rounds");
    const form = app.querySelector("form")!;
    const onRoundsChange = vi.fn();
    // Re-create renderer with spy on onRoundsChange
    const newRenderer = new GameRenderer({
      app,
      game,
      onMove: vi.fn(),
      onRoundsChange,
      onRestart: vi.fn(),
    });
    newRenderer.render();
    // Set input value and submit
    roundsInput!.value = "7";
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
    expect(onRoundsChange).toHaveBeenCalledWith(7);
  });

  it("renders initial rounds prompt", () => {
    const { renderer, app } = renderGame();
    renderer.renderInitialRoundsPrompt(5);
    expect(app.innerHTML).toContain("Choose how many rounds to play");
    const input = app.querySelector<HTMLInputElement>("#rounds");
    expect(input).not.toBeNull();
    expect(input?.value).toBe("5");
  });
});

describe("GameRenderer - edge cases", () => {
  it("renders gracefully with empty/null game", () => {
    const app = document.createElement("div");
    const renderer = new GameRenderer({
      app,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      game: {} as any,
      onMove: vi.fn(),
      onRoundsChange: vi.fn(),
      onRestart: vi.fn(),
    });
    expect(() => renderer.renderInitialRoundsPrompt(0)).not.toThrow();
    expect(app.innerHTML).toContain("Choose how many rounds to play");
  });

  it("ignores move button clicks if game is finished", () => {
    const { app, game, moves, renderer } = renderGame();
    game.finished = true;
    renderer.render();
    app
      .querySelectorAll<HTMLButtonElement>(".move-btn")
      .forEach((btn) => btn.click());
    expect(moves.length).toBe(0);
  });

  it("does not break if history is empty", () => {
    const { renderer } = renderGame();
    expect(() => renderer.render()).not.toThrow();
  });
});
