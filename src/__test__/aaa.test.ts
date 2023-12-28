import { multiply } from "./aaa";

import { expect,test,describe } from "vitest";

describe("multiply function", () => {
  test("should multiply two positive numbers correctly", () => {
    const result = multiply(3, 4);
    expect(result).toBe(12);
  });

  test("should multiply two negative numbers correctly", () => {
    const result = multiply(-3, -4);
    expect(result).toBe(12);
  });

  test("マイナスをかける", () => {
    const result = multiply(3, -4);
    expect(result).toBe(-12);
  });

  test("ゼロをかける", () => {
    const result = multiply(0, 5);
    expect(result).toBe(0);
  });

  // 他のテストケースも追加できます
});
