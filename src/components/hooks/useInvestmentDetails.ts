import { useCallback, useEffect, useState } from "react";
import {
  collectInvestmentDetails,
  InvestmentDetails
} from "../../services/investment";

function useInvestmentDetails(
  amount: number | null,
  numberOfYears: number | null
): InvestmentDetails {
  const [investmentDetails, setInvestmentDetails] = useState({});

  const updateInvestmentDetails = useCallback(async () => {
    try {
      const investmentDetails = await collectInvestmentDetails({
        amount,
        numberOfYears
      });
      setInvestmentDetails(investmentDetails);
    } catch (error: unknown) {
      console.error((error as Error).message)
    }
  }, [amount, numberOfYears]);

  useEffect(() => {
    updateInvestmentDetails();
  }, [updateInvestmentDetails]);

  return investmentDetails;
}

export default useInvestmentDetails;
