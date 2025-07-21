// tests\renderer.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import { GameRenderer } from "~/src/GameRenderer";
import { Game } from "~/src/game";
import type { Move } from "~/types";

describe("GameRenderer", () => {
  let app: HTMLElement;
  let game: Game;
  let renderer: GameRenderer;
  let moves: Move[];

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    app = document.getElementById("app")!;
    game = new Game(3);
    moves = [];
    renderer = new GameRenderer({
      app,
      game,
      onMove: (move) => moves.push(move),
      onRoundsChange: vi.fn(),
      onRestart: vi.fn(),
    });
  });

  it("renders initial UI with header, moves, and score", () => {
    renderer.render();
    expect(app.innerHTML).toContain("Rock Paper Scissors");
    expect(app.innerHTML).toContain("You: 0");
    expect(app.querySelectorAll(".move-btn").length).toBe(3);
  });

  it("calls onMove callback when move button clicked", () => {
    renderer.render();
    const btns = app.querySelectorAll<HTMLButtonElement>(".move-btn");
    btns[0].click();
    expect(moves.length).toBe(1);
    expect(["rock", "paper", "scissors"]).toContain(moves[0]);
  });

  it("shows history and updates after each move", () => {
    game.playRound("rock", "scissors"); // player win
    renderer.render();
    expect(app.innerHTML).toContain(
      "You chose <b>rock</b>, Computer chose <b>scissors</b>",
    );
    expect(app.innerHTML).toContain("Player wins");
    expect(app.innerHTML).toContain("Round-by-round history");
    expect(app.innerHTML).toContain("rock");
    expect(app.innerHTML).toContain("scissors");
    expect(app.innerHTML).toContain("1");
  });

  it("renders game end panel when finished", () => {
    // simulate two quick wins (best of 3)
    game.playRound("rock", "scissors");
    game.playRound("rock", "scissors");
    renderer.render();
    expect(app.innerHTML).toContain("You win the series");
    expect(app.querySelector("#restart-btn")).not.toBeNull();
  });

  it("allows changing rounds at end panel", () => {
    // Simulate finished game
    game.finished = true;
    renderer.render();
    const roundsInput = app.querySelector<HTMLInputElement>("#rounds");
    expect(roundsInput).not.toBeNull();
  });

  it("renders initial rounds prompt", () => {
    renderer.renderInitialRoundsPrompt(7);
    expect(app.innerHTML).toContain("Choose how many rounds to play");
    const input = app.querySelector<HTMLInputElement>("#rounds");
    expect(input).not.toBeNull();
    expect(input?.value).toBe("7");
  });
});
