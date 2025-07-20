// src\index.ts

import type { Move } from "~/types";
import {
  playRound,
  getComputerMove,
  handleRoundResult,
  showScore,
  showFinalScore,
} from "~/utils";

declare global {
  var __MOCK_COMP_MOVE__: (() => Move) | undefined;
}

function playGame(rounds: number): void {
  let count = 0;
  let playerScore = 0;
  let computerScore = 0;
  let draws = 0;
  const winScore = Math.floor(rounds / 2) + 1;

  while (count < rounds && playerScore < winScore && computerScore < winScore) {
    const input = prompt(
      `Choose rock, paper, or scissors: (Round ${count + 1} of max ${rounds})`,
    );

    if (!input) {
      alert(
        `Game ended. Thanks for playing!\n\nFinal score:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}`,
      );
      return;
    }

    const getCompMove =
      typeof globalThis.__MOCK_COMP_MOVE__ === "function"
        ? globalThis.__MOCK_COMP_MOVE__
        : getComputerMove;
    const result = playRound(input, getCompMove);

    ({ playerScore, computerScore, draws } = handleRoundResult(
      result,
      input,
      playerScore,
      computerScore,
      draws,
    ));

    showScore(playerScore, computerScore, draws);
    count++;
  }

  if (playerScore === winScore || computerScore === winScore) {
    alert(
      playerScore === winScore
        ? `You win the best of ${rounds} series!`
        : `Computer wins the best of ${rounds} series!`,
    );
    showFinalScore(playerScore, computerScore, draws);
  } else {
    alert(
      `No clear winner after ${rounds} rounds!\nFinal score:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}`,
    );
  }
}

if (
  typeof window !== "undefined" &&
  typeof prompt === "function" &&
  typeof alert === "function" &&
  (process.env.PLAY_GAME === "true" || process.env.VITEST !== "true")
) {
  let nRounds = 5;
  const input = prompt("Play best of how many rounds? (must be odd):", "5");
  if (input) {
    const parsed = parseInt(input, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed % 2 === 1) {
      nRounds = parsed;
    }
  }
  playGame(nRounds);
}
