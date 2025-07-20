// utils\index.ts

import type { Move, Result } from "~/types";

export function getComputerMove(): Move {
  const moves: Move[] = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

export function getWinner(
  player: string,
  computer: string,
): Result | "Invalid input" {
  const moves = ["rock", "paper", "scissors"];
  if (!moves.includes(player) || !moves.includes(computer)) {
    return "Invalid input";
  }

  if (player === computer) {
    return "Draw";
  }

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
  const playerMove = input.trim().toLowerCase();
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

export function handleRoundResult(
  result: string,
  input: string,
  playerScore: number,
  computerScore: number,
  draws: number,
): { playerScore: number; computerScore: number; draws: number } {
  alert(result);

  const regex = /Computer chose (\w+)\./;
  const match = regex.exec(result);
  const computerMove = match ? match[1] : "";
  const playerMove = input.trim().toLowerCase();
  const winner = getWinner(playerMove, computerMove);

  if (winner === "Player wins") playerScore++;
  else if (winner === "Computer wins") computerScore++;
  else if (winner === "Draw") draws++;

  return { playerScore, computerScore, draws };
}
