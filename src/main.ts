// src\main.ts

// Define possible moves
type Move = "rock" | "paper" | "scissors";

// Function to determine the winner
export function getWinner(
  player1: Move,
  player2: Move,
): "Player 1 wins" | "Player 2 wins" | "Draw" {
  if (player1 === player2) {
    return "Draw";
  }

  if (
    (player1 === "rock" && player2 === "scissors") ||
    (player1 === "scissors" && player2 === "paper") ||
    (player1 === "paper" && player2 === "rock")
  ) {
    return "Player 1 wins";
  }

  return "Player 2 wins";
}

// Example usage
const player1Move: Move = "rock";
const player2Move: Move = "scissors";
const result = getWinner(player1Move, player2Move);
console.log(`Player 1 chose ${player1Move}, Player 2 chose ${player2Move}.`);
console.log(result);
