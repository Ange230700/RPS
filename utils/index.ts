// utils\index.ts

import type { Move, Result } from "~/types";
import { MOVES } from "~/types";

export function getComputerMove(): Move {
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  return MOVES[randomIndex];
}

export function getWinner(player: Move, computer: Move): Result {
  if (player === computer) return "Draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "Player wins";
  }

  return "Computer wins";
}

export function playRound(
  input: string,
  getCompMove: () => Move = getComputerMove,
): string {
  const playerMove = input.trim().toLowerCase() as Move;
  const moves = ["rock", "paper", "scissors"];
  if (!moves.includes(playerMove)) {
    return "Invalid move. Please choose rock, paper, or scissors.";
  }
  const computerMove = getCompMove();
  const result = getWinner(playerMove, computerMove);
  return `Computer chose ${computerMove}.\n${result}`;
}

export function showFinalScore(
  playerScore: number,
  computerScore: number,
  draws: number,
) {
  alert(
    `Final score:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}\nThanks for playing!`,
  );
}

export function showScore(
  playerScore: number,
  computerScore: number,
  draws: number,
) {
  alert(
    `Score so far:\nYou: ${playerScore}\nComputer: ${computerScore}\nDraws: ${draws}`,
  );
}

export function isValidRounds(n: number) {
  return Number.isInteger(n) && n > 0 && n % 2 === 1;
}

export const STORAGE_KEY = "rps:last_game";

export function saveGameState(game: {
  rounds: number;
  playerScore: number;
  computerScore: number;
  draws: number;
  history: {
    round: number;
    player: string;
    computer: string;
    result: string;
  }[];
}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
}

export function loadGameState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearGameState() {
  localStorage.removeItem(STORAGE_KEY);
}
