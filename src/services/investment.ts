import { MAX_NUMBER_OF_YEARS, MIN_AMOUNT, MIN_NUMBER_OF_YEARS } from "../constants/investment-details";
import calculateAnnualGrowth from "../utils/calculate-annual-growth";

export interface InvestmentDetails {
  annualGrowth?: Array<number>;
}

function collectAnnualGrowth(
  amount: number | null,
  numberOfYears: number | null,
  growthRate: number | null,
): Array<number> | undefined {
  if (
    amount == null ||
    amount <= MIN_AMOUNT ||
    numberOfYears == null ||
    numberOfYears < MIN_NUMBER_OF_YEARS ||
    numberOfYears > MAX_NUMBER_OF_YEARS ||
    growthRate == null
  ) {
    return;
  }
  return calculateAnnualGrowth(amount, numberOfYears, growthRate);
}

export function collectInvestmentDetails({
  amount,
  numberOfYears,
  growthRate,
}: {
  amount: number | null;
  numberOfYears: number | null;
  growthRate: number | null;
}): InvestmentDetails {
  const annualGrowth = collectAnnualGrowth(amount, numberOfYears, growthRate);

  return {
    annualGrowth,
  };
}
