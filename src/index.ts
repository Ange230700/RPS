// src\index.ts

import type { Move } from "~/types";
import { playRound, getComputerMove } from "~/utils";

// Allow for dependency injection in tests
declare global {
  var __MOCK_COMP_MOVE__: (() => Move) | undefined;
}

function playGame(rounds: number = Infinity) {
  let count = 0;
  while (count < rounds) {
    const input = prompt("Choose rock, paper, or scissors:");
    if (!input) {
      alert("Game ended. Thanks for playing!");
      return;
    }
    // Use the injected mock, or fall back to default
    const getCompMove =
      typeof globalThis.__MOCK_COMP_MOVE__ === "function"
        ? globalThis.__MOCK_COMP_MOVE__
        : getComputerMove;
    const result = playRound(input, getCompMove);
    alert(result);
    count++;
  }
}

if (
  typeof window !== "undefined" &&
  typeof prompt === "function" &&
  typeof alert === "function" &&
  (process.env.PLAY_GAME === "true" || process.env.VITEST !== "true")
) {
  playGame();
}
