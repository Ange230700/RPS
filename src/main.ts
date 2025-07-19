// src\main.ts

import * as readline from "readline";
import { fileURLToPath } from "url";
import { getWinner, playRound } from "~/utils";

const currentFile = fileURLToPath(import.meta.url);
const mainFile = process.argv[1];

if (currentFile === mainFile) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let playerScore = 0;
  let computerScore = 0;
  let draws = 0;

  function askRound() {
    rl.question(
      "Choose rock, paper, or scissors (or type 'quit' to exit): ",
      (answer) => {
        if (answer.toLowerCase() === "quit") {
          console.log("\nFinal score:");
          console.log(`You: ${playerScore}`);
          console.log(`Computer: ${computerScore}`);
          console.log(`Draws: ${draws}`);
          console.log("Thanks for playing!");
          rl.close();
          return;
        }
        // Play round
        const roundResult = playRound(answer);
        console.log(roundResult);

        // Update scores
        // Get computer move from output string (a bit hacky, but works with your format)
        const regex = /Computer chose (\w+)\./;
        const match = regex.exec(roundResult);
        const computerMove = match ? match[1] : "";
        const playerMove = answer.trim().toLowerCase();
        const winner = getWinner(playerMove, computerMove);

        if (winner === "Player wins") playerScore++;
        else if (winner === "Computer wins") computerScore++;
        else if (winner === "Draw") draws++;

        console.log(
          `Score — You: ${playerScore} | Computer: ${computerScore} | Draws: ${draws}\n`,
        );
        askRound();
      },
    );
  }

  askRound();
}
