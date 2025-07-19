// tests\index.spec.ts

import { beforeEach, afterEach, it, expect, vi } from "vitest";

// We have to import *after* mocks so our code picks up the mocks.
let alertMock: ReturnType<typeof vi.fn>;
let promptMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
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
  vi.restoreAllMocks();
});

it("should alert the result of playRound with user's input", async () => {
  // Simulate the user typing "rock"
  promptMock.mockReturnValue("rock");

  // Import after mocking (this triggers the IIFE)
  await import("../src/index.ts");

  // prompt should have been called
  expect(promptMock).toHaveBeenCalledWith("Choose rock, paper, or scissors:");

  // alert should have been called once, with the game result containing "Computer chose"
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock.mock.calls[0][0]).toMatch(
    /Computer chose (rock|paper|scissors)\./,
  );
});

it("should not alert if user cancels prompt", async () => {
  promptMock.mockReturnValue(null); // Simulate cancel

  await import("../src/index.ts");

  expect(alertMock).not.toHaveBeenCalled();
});
