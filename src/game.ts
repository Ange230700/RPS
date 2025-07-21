// src/game.ts

import { getComputerMove, getWinner } from "~/utils";
import type { Move, Result } from "~/types";

export class Game {
  rounds: number;
  roundNum: number;
  playerScore: number;
  computerScore: number;
  draws: number;
  history: { round: number; player: Move; computer: Move; result: Result }[];
  finished: boolean;

  constructor(rounds: number) {
    this.rounds = rounds;
    this.roundNum = 1;
    this.playerScore = 0;
    this.computerScore = 0;
    this.draws = 0;
    this.history = [];
    this.finished = false;
  }

  playRound(playerMove: Move, computerMove?: Move) {
    if (this.finished) throw new Error("Game finished");
    computerMove = computerMove || getComputerMove();
    const result = getWinner(playerMove, computerMove);
    this.history.push({
      round: this.roundNum,
      player: playerMove,
      computer: computerMove,
      result,
    });
    if (result === "Player wins") this.playerScore++;
    else if (result === "Computer wins") this.computerScore++;
    else this.draws++;
    this.roundNum++;

    const winScore = Math.floor(this.rounds / 2) + 1;
    if (
      this.playerScore === winScore ||
      this.computerScore === winScore ||
      this.roundNum > this.rounds
    ) {
      this.finished = true;
    }
    return result;
  }
}
