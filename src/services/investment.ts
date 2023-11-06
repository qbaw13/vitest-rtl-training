import fetchGrowthRate from "../api/fetch-growth-rate";
import { MAX_NUMBER_OF_YEARS, MIN_AMOUNT, MIN_NUMBER_OF_YEARS } from "../constants";
import calculateAnnualGrowth from "../utils/calculate-annual-growth";

const GROWTH_RATE_PROVIDER = "GROWTH_RATE_PROVIDER";

export interface InvestmentDetails {
  annualGrowth?: Array<number>;
}

async function collectAnnualGrowth(
  amount: number | null,
  numberOfYears: number | null
) {
  if (
    amount == null ||
    amount <= MIN_AMOUNT ||
    numberOfYears == null ||
    numberOfYears < MIN_NUMBER_OF_YEARS ||
    numberOfYears > MAX_NUMBER_OF_YEARS
  ) {
    return 
  }
  const growthRate = await fetchGrowthRate(GROWTH_RATE_PROVIDER);
  return calculateAnnualGrowth(amount, numberOfYears, growthRate);
}

export async function collectInvestmentDetails({
  amount,
  numberOfYears
}: {
  amount: number | null;
  numberOfYears: number | null;
}): Promise<InvestmentDetails> {
  const annualGrowth = await collectAnnualGrowth(amount, numberOfYears);

  return {
    annualGrowth
  };
}
