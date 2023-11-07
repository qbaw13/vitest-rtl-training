import { MIN_AMOUNT, MIN_GROWTH_RATE, MIN_NUMBER_OF_YEARS } from "../constants/investment-details";

function validate(amount: number, numberOfYears: number, growthRate: number) {
  if (numberOfYears < MIN_NUMBER_OF_YEARS) {
    throw new Error(`Number of years should be positive number, numberOfYears=${numberOfYears}`);
  }
  if (amount <= MIN_AMOUNT) {
    throw new Error(`Amount should be positive number, amount=${amount}`);
  }
  if (growthRate <= MIN_GROWTH_RATE) {
    throw new Error(`Growth rate should be positive number, growthRate=${growthRate}`);
  }
}

function calculateAnnualGrowth(amount: number, numberOfYears: number, growthRate: number): Array<number> {
  validate(amount, numberOfYears, growthRate);
  const annualGrowth = [amount];

  for (let i = 1; i <= numberOfYears; i++) {
    const amountAfterGrowth = annualGrowth[i - 1] * (1 + growthRate);
    annualGrowth.push(amountAfterGrowth);
  }

  return annualGrowth;
}

export default calculateAnnualGrowth;
