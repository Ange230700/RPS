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

  rl.question("Choose rock, paper, or scissors: ", (answer) => {
    console.log(playRound(answer));
    rl.close();
  });
}
