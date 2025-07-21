// tests\helpers.ts

import { GameRenderer } from "~/src/GameRenderer";
import { Game } from "~/src/game";
import { renderGuessGame } from "~/src/pages/GuessGame";

export function renderGame(rounds = 3) {
  document.body.innerHTML = '<div id="app"></div>';
  const app = document.getElementById("app")!;
  const game = new Game(rounds);
  const moves: string[] = [];
  const renderer = new GameRenderer({
    app,
    game,
    onMove: (move) => moves.push(move),
    onRoundsChange: () => {},
    onRestart: () => {},
  });
  renderer.render();
  return { app, game, renderer, moves };
}

export function renderGuessGameTest() {
  document.body.innerHTML = `<div id="app"></div>`;
  const app = document.getElementById("app")!;
  renderGuessGame(app);
  return { app };
}
