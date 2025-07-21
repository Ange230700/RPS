// tests\game.test.ts

import { describe, it, expect } from "vitest";
import { Game } from "~/src/game";

describe("Game", () => {
  it("initializes state", () => {
    const g = new Game(3);
    expect(g.rounds).toBe(3);
    expect(g.playerScore).toBe(0);
    expect(g.computerScore).toBe(0);
    expect(g.draws).toBe(0);
    expect(g.finished).toBe(false);
    expect(g.history.length).toBe(0);
  });

  it("plays a round and updates state", () => {
    const g = new Game(3);
    g.playRound("rock", "scissors"); // player win
    expect(g.playerScore).toBe(1);
    expect(g.computerScore).toBe(0);
    expect(g.draws).toBe(0);
    expect(g.history.length).toBe(1);
    expect(g.finished).toBe(false);
  });

  it("ends game when winScore reached", () => {
    const g = new Game(3); // winScore is 2
    g.playRound("rock", "scissors"); // player win
    g.playRound("rock", "scissors"); // player win again
    expect(g.playerScore).toBe(2);
    expect(g.finished).toBe(true);
  });

  it("ends in a draw if needed", () => {
    const g = new Game(3);
    g.playRound("rock", "rock"); // draw
    g.playRound("paper", "paper"); // draw
    g.playRound("scissors", "scissors"); // draw
    expect(g.draws).toBe(3);
    expect(g.finished).toBe(true);
    expect(g.playerScore).toBe(0);
    expect(g.computerScore).toBe(0);
  });
});
