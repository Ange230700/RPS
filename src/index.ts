// src/index.ts

import { renderGuessGame } from "~/src/pages/GuessGame";
import { renderHome } from "~/src/pages/Home";
import { renderRockPaperScissors } from "~/src/pages/RockPaperScissors";

const app = document.getElementById("app")!;

function router() {
  const hash = window.location.hash || "#/";
  if (hash === "#/guess") {
    renderGuessGame(app);
  } else if (hash === "#/" || hash === "") {
    renderHome(app);
  } else if (hash === "#/rps") {
    renderRockPaperScissors(app);
  } else {
    app.innerHTML = `<div class="text-center my-10 text-red-600">404 - Page Not Found</div>`;
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
