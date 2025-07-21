// tests/loops.test.ts

import { describe, it, expect, vi } from "vitest";
import { displayEvenNumbers } from "~/utils/loops";

describe("displayEvenNumbers", () => {
  it("should log only even numbers up to the given limit", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayEvenNumbers(6);
    // Expect: 0, 2, 4, 6 to have been logged
    expect(logSpy.mock.calls.flat()).toEqual([0, 2, 4, 6]);
    logSpy.mockRestore();
  });

  it("should not log anything if limit is less than 0", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayEvenNumbers(-1);
    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
