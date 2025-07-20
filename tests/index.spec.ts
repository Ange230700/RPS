// tests\index.spec.ts

import { beforeEach, afterEach, it, expect, vi, describe } from "vitest";

describe("Rock-Paper-Scissors Game (Browser UI)", () => {
  let alertMock: ReturnType<typeof vi.fn>;
  let promptMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.PLAY_GAME = "true";
    vi.resetModules();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).prompt
      .mockReturnValueOnce("rock")
      .mockReturnValueOnce(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__MOCK_COMP_MOVE__ = () => "scissors";

    await import("../src/index.ts");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((globalThis as any).alert).toHaveBeenCalled();
  });

  it("should alert the result of playRound with user's input", async () => {
    promptMock
      .mockReturnValueOnce("1")
      .mockReturnValueOnce("rock")
      .mockReturnValueOnce(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__MOCK_COMP_MOVE__ = () => "scissors";

    await import("../src/index.ts");

    expect(alertMock).toHaveBeenCalledTimes(4);
    expect(alertMock.mock.calls[0][0]).toMatch(
      /Computer chose (rock|paper|scissors)\./,
    );
    expect(alertMock.mock.calls[1][0]).toMatch(/Score so far:/);
    expect(alertMock.mock.calls[2][0]).toMatch(/You win the best of 1 series!/);
    expect(alertMock.mock.calls[3][0]).toMatch(/Final score:/);
  });

  it("should not alert if user cancels prompt", async () => {
    promptMock.mockReturnValue(null);

    await import("../src/index.ts");

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith(
      `Game ended. Thanks for playing!\n\nFinal score:\nYou: 0\nComputer: 0\nDraws: 0`,
    );
  });

  it("plays best of 3 and stops when a player reaches 2", async () => {
    process.env.PLAY_GAME = "true";
    vi.resetModules();

    const alertMock = vi.fn();
    const promptMock = vi
      .fn()
      .mockReturnValueOnce("3")
      .mockReturnValueOnce("rock")
      .mockReturnValueOnce("rock");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).alert = alertMock;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).prompt = promptMock;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__MOCK_COMP_MOVE__ = () => "scissors";

    await import("../src/index.ts");

    const alertMessages = alertMock.mock.calls.map((call) => call[0]);
    expect(
      alertMessages.some((msg) => /You win the best of 3 series!/.test(msg)),
    ).toBe(true);
    expect(alertMessages.some((msg) => /Final score:/.test(msg))).toBe(true);
  });
});
