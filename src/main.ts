// src\main.ts

import * as readline from "readline";
import { fileURLToPath } from "url";
import { playRound } from "~/utils";

const currentFile = fileURLToPath(import.meta.url);
const mainFile = process.argv[1];

if (currentFile === mainFile) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askRound() {
    rl.question(
      "Choose rock, paper, or scissors (or type 'quit' to exit): ",
      (answer) => {
        if (answer.toLowerCase() === "quit") {
          console.log("Thanks for playing!");
          rl.close();
          return;
        }
        console.log(playRound(answer));
        askRound();
      },
    );
  }

  askRound();
}
