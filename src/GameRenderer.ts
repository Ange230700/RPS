// src/GameRenderer.ts

import type { Game } from "~/src/game";
import type { Move } from "~/types";
import { MOVES } from "~/types";
import { saveGameState, clearGameState } from "~/utils";

export class GameRenderer {
  private readonly app: HTMLElement;
  private readonly game: Game;
  private readonly onMove: (move: Move) => void;
  private readonly onRoundsChange: (rounds: number) => void;
  private readonly onRestart: () => void;

  constructor(options: {
    app: HTMLElement;
    game: Game;
    onMove: (move: Move) => void;
    onRoundsChange: (rounds: number) => void;
    onRestart: () => void;
  }) {
    this.app = options.app;
    this.game = options.game;
    this.onMove = options.onMove;
    this.onRoundsChange = options.onRoundsChange;
    this.onRestart = options.onRestart;
  }

  headerAndScore(game: Game) {
    return `
    <h1 class="text-2xl font-bold mb-2 text-center">Rock Paper Scissors</h1>
    <p class="text-center mb-6 text-gray-600">Best of ${game.rounds} rounds</p>
    <div class="flex justify-center gap-4 mb-4">
      <span class="font-semibold">You: ${game.playerScore}</span>
      <span class="font-semibold">Computer: ${game.computerScore}</span>
      <span class="font-semibold">Draws: ${game.draws}</span>
    </div>
  `;
  }

  moveButtonsRow(game: Game) {
    if (game.finished) return "";
    return `
    <div class="mb-4 text-center">
      <div class="mb-2">Round <span class="font-semibold">${game.roundNum}</span> of <span class="font-semibold">${game.rounds}</span></div>
      <div class="flex justify-center gap-4">
        ${MOVES.map(
          (move) =>
            `<button data-move="${move}" class="move-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">${move[0].toUpperCase() + move.slice(1)}</button>`,
        ).join("")}
      </div>
    </div>
  `;
  }

  lastResultBox(game: Game) {
    if (game.history.length === 0) return "";
    const last = game.history[game.history.length - 1];
    let resultColor = "";
    if (last.result === "Player wins") resultColor = "text-green-600";
    else if (last.result === "Computer wins") resultColor = "text-red-600";
    else resultColor = "text-gray-700";
    return `
    <div class="mb-4 p-3 bg-gray-50 rounded-lg text-center">
      <span class="block font-medium text-gray-700">You chose <b>${last.player}</b>, Computer chose <b>${last.computer}</b></span>
      <span class="block text-lg mt-2 ${resultColor}">
        ${last.result === "Draw" ? "It's a draw!" : last.result}
      </span>
    </div>
  `;
  }

  historyTable(game: Game) {
    if (game.history.length === 0) return "";
    return `
    <h2 class="font-semibold mb-2 mt-4 text-center">Round-by-round history</h2>
    <div class="overflow-x-auto">
      <table class="w-full mb-4 text-sm border border-gray-200 rounded">
        <thead>
          <tr>
            <th class="px-2 py-1 border-b">Round</th>
            <th class="px-2 py-1 border-b">You</th>
            <th class="px-2 py-1 border-b">Computer</th>
            <th class="px-2 py-1 border-b">Result</th>
          </tr>
        </thead>
        <tbody>
          ${game.history
            .map(
              (h) => `
            <tr>
              <td class="px-2 py-1 border-b text-center">${h.round}</td>
              <td class="px-2 py-1 border-b text-center">${h.player}</td>
              <td class="px-2 py-1 border-b text-center">${h.computer}</td>
              <td class="px-2 py-1 border-b text-center">${h.result}</td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
  }

  endGamePanel(game: Game) {
    if (!game.finished) return "";
    let endMsg = "";
    if (game.playerScore > game.computerScore)
      endMsg = "🎉 <b>You win the series!</b>";
    else if (game.computerScore > game.playerScore)
      endMsg = "😔 <b>Computer wins the series!</b>";
    else endMsg = "🤝 <b>It's a draw!</b>";

    return `
    <div class="text-center mt-6">
      <div class="text-xl mb-2">${endMsg}</div>
      <button id="restart-btn" class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Play again</button>
      <form class="mt-3 flex justify-center gap-2 items-center">
        <label for="rounds" class="mr-2 text-gray-700">Best of:</label>
        <input type="number" id="rounds" min="1" step="2" value="${game.rounds}" class="w-16 px-2 py-1 border rounded" />
        <button type="submit" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Set</button>
      </form>
    </div>
  `;
  }

  initialRoundsPrompt(defaultRounds = 5) {
    return `
    <h1 class="text-2xl font-bold mb-2 text-center">Rock Paper Scissors</h1>
    <p class="text-center mb-6 text-gray-600">Choose how many rounds to play (must be odd):</p>
    <form class="flex justify-center gap-2 items-center">
      <input type="number" id="rounds" min="1" step="2" value="${defaultRounds}" class="w-16 px-2 py-1 border rounded" />
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Start</button>
    </form>
  `;
  }

  render() {
    const { game } = this;

    // Compose the main HTML using the template methods.
    this.app.innerHTML =
      this.headerAndScore(game) +
      this.moveButtonsRow(game) +
      this.lastResultBox(game) +
      this.historyTable(game) +
      this.endGamePanel(game);

    if (game.finished) {
      saveGameState({
        rounds: game.rounds,
        playerScore: game.playerScore,
        computerScore: game.computerScore,
        draws: game.draws,
        history: game.history,
      });
      const restartBtn = document.getElementById("restart-btn");
      if (restartBtn) {
        restartBtn.onclick = () => {
          clearGameState();
          this.onRestart();
        };
      }
      const form = this.app.querySelector("form");
      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          const roundsInput = document.getElementById(
            "rounds",
          ) as HTMLInputElement | null;
          if (roundsInput) {
            const newRounds = parseInt(roundsInput.value, 10);
            this.onRoundsChange(newRounds);
          }
        };
      }
      return;
    }

    // Otherwise, wire up move button handlers
    this.app.querySelectorAll<HTMLButtonElement>(".move-btn").forEach((btn) => {
      btn.onclick = () => {
        this.onMove(btn.dataset.move as Move);
      };
    });
  }

  renderInitialRoundsPrompt(defaultRounds = 5) {
    this.app.innerHTML = this.initialRoundsPrompt(defaultRounds);
    const form = this.app.querySelector("form")!;
    form.onsubmit = (e) => {
      e.preventDefault();
      const n = parseInt(
        (document.getElementById("rounds") as HTMLInputElement).value,
        10,
      );
      this.onRoundsChange(n);
    };
  }
}
