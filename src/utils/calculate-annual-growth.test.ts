import calculateAnnualGrowth from "./calculate-annual-growth";

describe("calculate annual growth", () => {
  it("should return calculated annual growth", () => {
    const actual = calculateAnnualGrowth(345, 4, 0.0645);

    expect(actual).toEqual([345, 367.2525, 390.94028625, 416.15593471312496, 442.9979925021215]);
  });

  it.each`
    amount | numberOfYears | growthRate
    ${0}   | ${1}          | ${1}
    ${1}   | ${0}          | ${1}
    ${1}   | ${1}          | ${0}
  `(
    "should throw an error when amount=$amount, numberOfYears=$numberOfYears, growthRate=$growthRate",
    ({ amount, numberOfYears, growthRate }) => {
      expect(() => {
        calculateAnnualGrowth(amount, numberOfYears, growthRate);
      }).toThrowErrorMatchingSnapshot();
    },
  );
});
