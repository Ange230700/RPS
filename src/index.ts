// src\index.ts

import type { Move } from "~/types";
import { playRound, getComputerMove, getWinner } from "~/utils";

// Allow for dependency injection in tests
declare global {
  var __MOCK_COMP_MOVE__: (() => Move) | undefined;
}

function playGame(rounds: number = Infinity) {
  let count = 0;
  let playerScore = 0;
  let computerScore = 0;
  let draws = 0;
  while (count < rounds) {
    const input = prompt("Choose rock, paper, or scissors:");
    if (!input) {
      alert(
        `Game ended. Thanks for playing!\n\nFinal score:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}`,
      );
      return;
    }
    // Use the injected mock, or fall back to default
    const getCompMove =
      typeof globalThis.__MOCK_COMP_MOVE__ === "function"
        ? globalThis.__MOCK_COMP_MOVE__
        : getComputerMove;
    const result = playRound(input, getCompMove);
    alert(result);
    // Parse moves and update score
    const regex = /Computer chose (\w+)\./;
    const match = regex.exec(result);
    const computerMove = match ? match[1] : "";
    const playerMove = input.trim().toLowerCase();
    const winner = getWinner(playerMove, computerMove);

    if (winner === "Player wins") playerScore++;
    else if (winner === "Computer wins") computerScore++;
    else if (winner === "Draw") draws++;

    alert(
      `Score so far:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}`,
    );
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
