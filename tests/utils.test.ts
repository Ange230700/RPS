// tests\utils.test.ts

import { describe, it, expect } from "vitest";
import { getWinner, isValidRounds, playRound } from "~/utils";
import type { Move } from "~/types";

describe("getWinner", () => {
  it("should declare draw when both moves are the same", () => {
    expect(getWinner("rock", "rock")).toBe("Draw");
    expect(getWinner("paper", "paper")).toBe("Draw");
    expect(getWinner("scissors", "scissors")).toBe("Draw");
  });

  it("should declare player win on winning combinations", () => {
    expect(getWinner("rock", "scissors")).toBe("Player wins");
    expect(getWinner("scissors", "paper")).toBe("Player wins");
    expect(getWinner("paper", "rock")).toBe("Player wins");
  });

  it("should declare computer win on losing combinations", () => {
    expect(getWinner("scissors", "rock")).toBe("Computer wins");
    expect(getWinner("paper", "scissors")).toBe("Computer wins");
    expect(getWinner("rock", "paper")).toBe("Computer wins");
  });
});

describe("isValidRounds", () => {
  it("returns true for positive odd integers", () => {
    expect(isValidRounds(1)).toBe(true);
    expect(isValidRounds(3)).toBe(true);
    expect(isValidRounds(99)).toBe(true);
  });

  it("returns false for even or non-positive numbers", () => {
    expect(isValidRounds(2)).toBe(false);
    expect(isValidRounds(0)).toBe(false);
    expect(isValidRounds(-1)).toBe(false);
    expect(isValidRounds(10)).toBe(false);
    expect(isValidRounds(NaN)).toBe(false);
  });
});

describe("playRound", () => {
  it("returns invalid for incorrect input", () => {
    expect(playRound("something")).toMatch(/Invalid move/i);
    expect(playRound("rockk")).toMatch(/Invalid move/i);
  });

  it("returns proper output for valid move", () => {
    const fixedComp = () => "scissors" as Move;
    expect(playRound("rock", fixedComp)).toMatch(/Computer chose scissors/);
    expect(playRound("rock", fixedComp)).toMatch(/Player wins/);
  });
});

describe("isValidRounds - edge cases", () => {
  it("returns false for non-integers", () => {
    expect(isValidRounds(3.5)).toBe(false);
    expect(isValidRounds(-3.5)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidRounds("3" as any)).toBe(false);
  });

  it("returns false for non-number values", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidRounds(null as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidRounds(undefined as any)).toBe(false);
    expect(isValidRounds(NaN)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidRounds({} as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidRounds([] as any)).toBe(false);
  });

  it("handles large numbers correctly", () => {
    expect(isValidRounds(1_001)).toBe(true);
    expect(isValidRounds(1_000)).toBe(false);
  });
});

describe("playRound - edge cases", () => {
  it("handles upper/lower/mixed case and whitespace", () => {
    expect(playRound("  RoCk ")).toMatch(/rock/i);
    expect(playRound(" PaPer ")).not.toMatch(/Invalid move/);
    expect(playRound("\tSCISSORS\n")).not.toMatch(/Invalid move/);
  });

  it("handles invalid moves with extra whitespace or chars", () => {
    expect(playRound("rock!")).toMatch(/Invalid move/);
    expect(playRound("papers")).toMatch(/Invalid move/);
  });

  it("doesn't break on empty input", () => {
    expect(playRound("")).toMatch(/Invalid move/);
    expect(playRound("    ")).toMatch(/Invalid move/);
  });
});

describe("getWinner - edge cases", () => {
  it("handles unknown moves defensively", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getWinner("lizard" as any, "spock" as any)).toBe("Computer wins");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getWinner("rock", "spock" as any)).toBe("Computer wins");
  });
});
