import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("lib/utils.ts - cn function", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "conditional")).toBe("base conditional");
    expect(cn("base", false && "conditional")).toBe("base");
  });

  it("handles arrays and objects", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("merges Tailwind classes with twMerge (deduplicates)", () => {
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
    expect(cn("mx-auto mx-4")).toBe("mx-4");
  });

  it("handles mixed inputs", () => {
    expect(cn("base", { conditional: true }, ["array", "classes"])).toBe(
      "base conditional array classes"
    );
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null as any, undefined as any)).toBe("");
  });
});