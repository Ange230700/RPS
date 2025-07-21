// src/pages/GuessGame.ts

export function renderGuessGame(container: HTMLElement) {
  container.innerHTML = `
    <div id="guessing-game" class="max-w-md mx-auto my-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 class="text-xl font-bold mb-4 text-center">Guess the Word!</h2>
      <div id="clue" class="mb-4 text-center text-gray-700 font-medium"></div>
      <div class="flex gap-2 justify-center mb-4">
        <input
          id="guess-input"
          type="text"
          placeholder="Your answer..."
          class="border rounded px-2 py-1 w-2/3"
        />
        <button
          id="submit-guess"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded"
        >
          Submit
        </button>
      </div>
      <div id="feedback" class="text-center text-lg font-semibold min-h-[1.5em]"></div>
    </div>
  `;

  // Game Logic
  const riddles = [
    {
      clue: "I have keys but open no locks. I have space but no room. You can enter, but can't go outside. What am I?",
      answer: "keyboard",
    },
    {
      clue: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
      answer: "candle",
    },
    {
      clue: "What has hands but can’t clap?",
      answer: "clock",
    },
  ];
  const randomIndex = Math.floor(Math.random() * riddles.length);
  const selectedRiddle = riddles[randomIndex];

  const clueDiv = document.getElementById("clue");
  if (clueDiv) clueDiv.textContent = selectedRiddle.clue;

  const submitBtn = document.getElementById("submit-guess");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const guessInput = document.getElementById(
        "guess-input",
      ) as HTMLInputElement;
      const userGuess = guessInput ? guessInput.value.trim().toLowerCase() : "";
      const isCorrect = userGuess === selectedRiddle.answer.toLowerCase();
      const feedbackDiv = document.getElementById("feedback");
      if (feedbackDiv) {
        if (isCorrect) {
          feedbackDiv.textContent = "✅ Correct! Well done!";
          feedbackDiv.style.color = "green";
        } else {
          feedbackDiv.textContent = "❌ Incorrect. Try again!";
          feedbackDiv.style.color = "red";
        }
      }
    });
  }
}
