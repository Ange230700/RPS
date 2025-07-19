// tests\main.spec.ts

import { describe, it, expect, vi, afterEach } from "vitest";
import * as mainModule from "~/src/main";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getWinner", () => {
  it("should return Draw for same moves", () => {
    expect(mainModule.getWinner("rock", "rock")).toBe("Draw");
    expect(mainModule.getWinner("paper", "paper")).toBe("Draw");
    expect(mainModule.getWinner("scissors", "scissors")).toBe("Draw");
  });

  it("should return Player wins when player beats computer", () => {
    expect(mainModule.getWinner("rock", "scissors")).toBe("Player wins");
    expect(mainModule.getWinner("paper", "rock")).toBe("Player wins");
    expect(mainModule.getWinner("scissors", "paper")).toBe("Player wins");
  });

  it("should return Computer wins when computer beats player", () => {
    expect(mainModule.getWinner("scissors", "rock")).toBe("Computer wins");
    expect(mainModule.getWinner("rock", "paper")).toBe("Computer wins");
    expect(mainModule.getWinner("paper", "scissors")).toBe("Computer wins");
  });

  it("should return Invalid input for any invalid move", () => {
    expect(mainModule.getWinner("banana", "rock")).toBe("Invalid input");
    expect(mainModule.getWinner("rock", "apple")).toBe("Invalid input");
    expect(mainModule.getWinner("banana", "apple")).toBe("Invalid input");
  });
});

describe("CLI playRound", () => {
  it("should handle invalid input", () => {
    expect(mainModule.playRound("banana")).toMatch(/Invalid move/);
    expect(mainModule.playRound("  ")).toMatch(/Invalid move/);
    expect(mainModule.playRound("Rockk")).toMatch(/Invalid move/);
  });

  it("should display correct result when player wins", () => {
    const output = mainModule.playRound("rock", () => "scissors");
    expect(output).toMatch(/Computer chose scissors\./);
    expect(output).toMatch(/Player wins/);
  });

  it("should display correct result when player loses", () => {
    const output = mainModule.playRound("rock", () => "paper");
    expect(output).toMatch(/Computer chose paper\./);
    expect(output).toMatch(/Computer wins/);
  });

  it("should display Draw when both moves are the same", () => {
    const output = mainModule.playRound("rock", () => "rock");
    expect(output).toMatch(/Computer chose rock\./);
    expect(output).toMatch(/Draw/);
  });
});
