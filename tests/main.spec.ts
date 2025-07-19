// tests\main.spec.ts

import { describe, it, expect, vi, afterEach } from "vitest";
import * as utils from "~/utils";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getWinner", () => {
  it("should return Draw for same moves", () => {
    expect(utils.getWinner("rock", "rock")).toBe("Draw");
    expect(utils.getWinner("paper", "paper")).toBe("Draw");
    expect(utils.getWinner("scissors", "scissors")).toBe("Draw");
  });

  it("should return Player wins when player beats computer", () => {
    expect(utils.getWinner("rock", "scissors")).toBe("Player wins");
    expect(utils.getWinner("paper", "rock")).toBe("Player wins");
    expect(utils.getWinner("scissors", "paper")).toBe("Player wins");
  });

  it("should return Computer wins when computer beats player", () => {
    expect(utils.getWinner("scissors", "rock")).toBe("Computer wins");
    expect(utils.getWinner("rock", "paper")).toBe("Computer wins");
    expect(utils.getWinner("paper", "scissors")).toBe("Computer wins");
  });

  it("should return Invalid input for any invalid move", () => {
    expect(utils.getWinner("banana", "rock")).toBe("Invalid input");
    expect(utils.getWinner("rock", "apple")).toBe("Invalid input");
    expect(utils.getWinner("banana", "apple")).toBe("Invalid input");
  });
});

describe("CLI playRound", () => {
  it("should handle invalid input", () => {
    expect(utils.playRound("banana")).toMatch(/Invalid move/);
    expect(utils.playRound("  ")).toMatch(/Invalid move/);
    expect(utils.playRound("Rockk")).toMatch(/Invalid move/);
  });

  it("should display correct result when player wins", () => {
    const output = utils.playRound("rock", () => "scissors");
    expect(output).toMatch(/Computer chose scissors\./);
    expect(output).toMatch(/Player wins/);
  });

  it("should display correct result when player loses", () => {
    const output = utils.playRound("rock", () => "paper");
    expect(output).toMatch(/Computer chose paper\./);
    expect(output).toMatch(/Computer wins/);
  });

  it("should display Draw when both moves are the same", () => {
    const output = utils.playRound("rock", () => "rock");
    expect(output).toMatch(/Computer chose rock\./);
    expect(output).toMatch(/Draw/);
  });
});
