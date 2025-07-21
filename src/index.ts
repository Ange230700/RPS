// src/index.ts

import { Game } from "~/src/game";
import { GameRenderer } from "~/src/GameRenderer";
import { isValidRounds, loadGameState } from "~/utils";

const app = document.getElementById("app")!;
if (!app) throw new Error("App element not found");

let game: Game;
let renderer: GameRenderer;

function startNewGame(rounds?: number) {
  const saved = loadGameState();
  if (
    saved &&
    isValidRounds(saved.rounds) &&
    (!rounds || rounds === saved.rounds)
  ) {
    game = new Game(saved.rounds);
    game.playerScore = saved.playerScore;
    game.computerScore = saved.computerScore;
    game.draws = saved.draws;
    game.history = saved.history;
    game.roundNum = saved.history.length + 1;
    game.finished = true;
  } else {
    game = new Game(rounds ?? 3);
  }
  renderer = new GameRenderer({
    app,
    game,
    onMove: handlePlayerMove,
    onRoundsChange: handleRoundsChange,
    onRestart: () => {
      startNewGame(game.rounds);
      renderer.render();
    },
  });
  renderer.render();
}

function handlePlayerMove(move: string) {
  if (game.finished) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game.playRound(move as any);
  renderer.render();
}

function handleRoundsChange(n: number) {
  if (isValidRounds(n)) {
    startNewGame(n);
    renderer.render();
  } else {
    alert("Number of rounds must be a positive odd number!");
    renderer.renderInitialRoundsPrompt();
  }
}

startNewGame();
