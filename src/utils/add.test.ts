import add from "./add";

describe("add", () => {
  it("should return 4 when a=2 and b=2", () => {
    const actual = add(2, 2);

    expect(actual).toBe(4);
  });
});
