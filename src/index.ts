// src\index.ts

import { playRound } from "~/utils";

if (
  typeof window !== "undefined" &&
  typeof prompt === "function" &&
  typeof alert === "function"
) {
  function playGame() {
    const input = prompt("Choose rock, paper, or scissors:");
    if (input === null) return;
    const result = playRound(input);
    alert(result);
  }

  playGame();
}
