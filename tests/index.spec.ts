// tests\index.spec.ts

import { beforeEach, afterEach, it, expect, vi } from "vitest";

// We have to import *after* mocks so our code picks up the mocks.
let alertMock: ReturnType<typeof vi.fn>;
let promptMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  process.env.PLAY_GAME = "true";
  // Reset modules before each test for clean import
  vi.resetModules();
  // Mock prompt and alert
  alertMock = vi.fn();
  promptMock = vi.fn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).alert = alertMock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).prompt = promptMock;
});

afterEach(() => {
  delete process.env.PLAY_GAME;
  vi.restoreAllMocks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (globalThis as any).__MOCK_COMP_MOVE__;
});

it("triggers playGame when PLAY_GAME is set", async () => {
  // Set up mocks before import!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).prompt
    .mockReturnValueOnce("rock")
    .mockReturnValueOnce(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).__MOCK_COMP_MOVE__ = () => "scissors";

  // Import after env/mocks
  await import("../src/index.ts");

  // Assert that alert and prompt were called as expected
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((globalThis as any).alert).toHaveBeenCalled();
});

it("should alert the result of playRound with user's input", async () => {
  // Simulate the user typing "rock"
  promptMock.mockReturnValueOnce("rock").mockReturnValueOnce(null);

  // Import after mocking (this triggers the IIFE)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).__MOCK_COMP_MOVE__ = () => "scissors";
  await import("../src/index.ts");

  // alert should have been called once, with the game result containing "Computer chose"
  expect(alertMock).toHaveBeenCalledTimes(2);
  expect(alertMock.mock.calls[0][0]).toMatch(
    /Computer chose (rock|paper|scissors)\./,
  );
  expect(alertMock.mock.calls[1][0]).toMatch(
    /Game ended\. Thanks for playing!/,
  );
});

it("should not alert if user cancels prompt", async () => {
  promptMock.mockReturnValue(null); // Simulate cancel

  await import("../src/index.ts");

  // Update: should be called once with goodbye message
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith("Game ended. Thanks for playing!");
});
