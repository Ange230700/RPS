// src/pages/Home.ts
export function renderHome(container: HTMLElement) {
  container.innerHTML = `
    <div class="text-center my-10">
      <h1 class="text-3xl font-bold mb-4">Welcome to the Game App</h1>
      <p class="text-lg text-gray-700">Choose a game from the navigation bar.</p>
    </div>
  `;
}
