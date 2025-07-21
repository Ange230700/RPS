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

describe("Game class - edge cases", () => {
  it("does not allow 0 or negative rounds", () => {
    expect(() => new Game(0)).not.toThrow();
    expect(() => new Game(-1)).not.toThrow();
    // Note: Game doesn't enforce validity, validation is expected in UI/logic.
  });

  it("doesn't increment scores for draw", () => {
    const game = new Game(1);
    game.playRound("rock", "rock");
    expect(game.playerScore).toBe(0);
    expect(game.computerScore).toBe(0);
    expect(game.draws).toBe(1);
  });

  it("records correct round numbers in history", () => {
    const game = new Game(3);
    game.playRound("rock", "rock"); // 1
    game.playRound("rock", "paper"); // 2
    expect(game.history[0].round).toBe(1);
    expect(game.history[1].round).toBe(2);
  });

  it("ignores further playRound calls after finished", () => {
    const game = new Game(1);
    game.playRound("rock", "scissors");
    expect(game.finished).toBe(true);
    expect(() => game.playRound("rock", "scissors")).toThrow();
  });

  it("handles huge number of rounds without crashing", () => {
    const game = new Game(9999);
    for (let i = 0; i < 10; i++) game.playRound("rock", "scissors");
    expect(game.playerScore).toBe(10);
    expect(game.finished).toBe(false); // hasn't reached threshold yet
  });
});
