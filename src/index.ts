// src/index.ts

import { Game } from "~/src/game";
import { GameRenderer } from "~/src/GameRenderer";
import { isValidRounds } from "~/utils";

const app = document.getElementById("app")!;
if (!app) throw new Error("App element not found");

let game: Game;
let renderer: GameRenderer;

function startNewGame(rounds: number) {
  game = new Game(rounds);
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

renderer = new GameRenderer({
  app,
  game: {} as Game,
  onMove: () => {},
  onRoundsChange: handleRoundsChange,
  onRestart: () => {},
});
renderer.renderInitialRoundsPrompt();
