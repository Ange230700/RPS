// src/pages/ShoppingList.ts

type Item = { name: string; achete: boolean };

export const shoppingList: Item[] = [];

export function renderShoppingList(container: HTMLElement) {
  // Initial HTML structure
  container.innerHTML = `
    <div class="max-w-md mx-auto my-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 class="text-xl font-bold mb-4 text-center">Shopping List 🛒</h2>
      <div class="flex gap-2 mb-4">
        <input
          id="item-input"
          type="text"
          placeholder="Add item..."
          class="border rounded px-2 py-1 flex-1"
        />
        <button
          id="add-item"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded"
        >
          Add
        </button>
      </div>
      <ul id="shopping-list" class="divide-y"></ul>
    </div>
  `;

  console.log("Shopping list:", shoppingList);

  function addItem(name: string) {
    if (!name.trim()) return;
    shoppingList.push({ name: name.trim(), achete: false });
    renderList();
  }

  function renderList() {
    const ul = document.getElementById("shopping-list")!;
    ul.innerHTML = "";
    shoppingList.forEach((item, idx) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.className =
        "py-2 cursor-pointer select-none transition" +
        (item.achete
          ? " achete line-through text-gray-400"
          : " hover:bg-gray-100");
      if (item.achete) li.setAttribute("aria-checked", "true");
      li.addEventListener("click", () => {
        shoppingList[idx].achete = !shoppingList[idx].achete;
        renderList();
      });
      ul.appendChild(li);
    });
  }

  const addBtn = document.getElementById("add-item")!;
  addBtn.addEventListener("click", () => {
    console.log("Adding an item");
    const input = document.getElementById("item-input") as HTMLInputElement;
    if (!input.value.trim()) return;
    console.log(input.value);
    addItem(input.value);
    input.value = "";
  });

  const input = document.getElementById("item-input") as HTMLInputElement;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  renderList();
}
