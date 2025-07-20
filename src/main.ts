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

  function promptBestOf() {
    rl.question("Play best of how many rounds? (must be odd): ", (nInput) => {
      const rounds = parseInt(nInput, 10);
      if (isNaN(rounds) || rounds < 1 || rounds % 2 === 0) {
        console.log("Please enter an odd number greater than 0.");
        return promptBestOf();
      }
      playBestOf(rounds);
    });
  }

  function playBestOf(rounds: number) {
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;
    const winScore = Math.floor(rounds / 2) + 1;

    function askRound() {
      rl.question(
        "Choose rock, paper, or scissors (or type 'quit' to exit): ",
        (answer) => {
          if (answer.toLowerCase() === "quit") {
            printFinal();
            rl.close();
            return;
          }

          const roundResult = playRound(answer);
          console.log(roundResult);

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

          if (playerScore === winScore || computerScore === winScore) {
            console.log(
              playerScore === winScore
                ? `You win the best of ${rounds} series!`
                : `Computer wins the best of ${rounds} series!`,
            );
            printFinal();
            rl.close();
            return;
          }
          askRound();
        },
      );
    }

    function printFinal() {
      console.log("\nFinal score:");
      console.log(`You: ${playerScore}`);
      console.log(`Computer: ${computerScore}`);
      console.log(`Draws: ${draws}`);
      console.log("Thanks for playing!");
    }

    askRound();
  }

  promptBestOf();
}
