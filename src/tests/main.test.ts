import { it, expect, describe } from 'vitest'

describe("localStorage", () => {
    it("should be available in jsdom environment", () => {
      localStorage.setItem("test", "value");
      expect(localStorage.getItem("test")).toBe("value");
    });
  });