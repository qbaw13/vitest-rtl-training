import { collectInvestmentDetails } from "./investment";
import fetchGrowthRate from "../api/fetch-growth-rate";

vi.mock("../api/fetch-growth-rate");

const mockedFetchGrowthRate = vi.mocked(fetchGrowthRate);

describe("investment", () => {
  describe("calculate investment details", () => {
    afterEach(() => {
      mockedFetchGrowthRate.mockClear();
    });

    it("should return calculated annual growth", async () => {
      mockedFetchGrowthRate.mockResolvedValue(0.0645);

      const actual = await collectInvestmentDetails({ amount: 345, numberOfYears: 4 });

      expect(actual).toMatchObject({
        annualGrowth: [
          345,
          367.2525,
          390.94028625,
          416.15593471312496,
          442.9979925021215
        ]
      });
    });

    it("should call annual growth api", async () => {
      await collectInvestmentDetails({ amount: 345, numberOfYears: 4 });

      expect(mockedFetchGrowthRate).toHaveBeenCalledWith("GROWTH_RATE_PROVIDER");
    });
  });
});
