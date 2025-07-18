// tests\main.spec.ts

import { describe, it, expect } from "vitest";
import { getWinner } from "../src/main";

// Option 1: If getWinner is not exported, add `export` before the function in main.ts

describe("getWinner", () => {
  it("should return Draw for same moves", () => {
    expect(getWinner("rock", "rock")).toBe("Draw");
    expect(getWinner("paper", "paper")).toBe("Draw");
    expect(getWinner("scissors", "scissors")).toBe("Draw");
  });

  it("should return Player 1 wins for winning scenarios", () => {
    expect(getWinner("rock", "scissors")).toBe("Player 1 wins");
    expect(getWinner("paper", "rock")).toBe("Player 1 wins");
    expect(getWinner("scissors", "paper")).toBe("Player 1 wins");
  });

  it("should return Player 2 wins for losing scenarios", () => {
    expect(getWinner("scissors", "rock")).toBe("Player 2 wins");
    expect(getWinner("rock", "paper")).toBe("Player 2 wins");
    expect(getWinner("paper", "scissors")).toBe("Player 2 wins");
  });
});
