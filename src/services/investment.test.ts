import { collectInvestmentDetails } from "./investment";

describe("investment", () => {
  describe("calculate investment details", () => {
    it("should return calculated annual growth", () => {
      // given
      const props = {
        growthRate: 0.0645,
        amount: 345,
        numberOfYears: 4,
      };

      // when
      const actual = collectInvestmentDetails(props);

      // then
      expect(actual).toMatchObject({
        annualGrowth: [345, 367.2525, 390.94028625, 416.15593471312496, 442.9979925021215],
      });
    });
  });
});
