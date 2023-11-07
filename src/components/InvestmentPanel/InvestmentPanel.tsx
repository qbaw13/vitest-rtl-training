import { memo, useState, useContext, useEffect } from "react";
import { Button, CircularProgress, List, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import withGrowthRateProvider from "./hocs/withGrowthRateProvider";
import GrowthRateContext from "../../contexts/GrowthRateContext";
import {
  MAX_GROWTH_RATE,
  MAX_NUMBER_OF_YEARS,
  MIN_AMOUNT,
  MIN_GROWTH_RATE,
  MIN_NUMBER_OF_YEARS,
} from "../../constants/investment-details";
import { InvestmentDetails, collectInvestmentDetails } from "../../services/investment";
import useDefaultFormValues from "./hooks/useDefaultFormValues";
import InvestmentListItem from "../InvestmentListItem/InvestmentListItem";
import withPremiumAccountNotification from "../../hocs/withPremiumAccountNotification";

interface Form {
  amount: number | string;
  numberOfYears: number | string;
  growthRate: number | string;
}

function InvestmentPanel() {
  const { growthRate, loading } = useContext(GrowthRateContext);
  const defaultValues = useDefaultFormValues({ growthRate });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    defaultValues,
  });
  const [invesmentDetails, setInvestmentDetails] = useState<InvestmentDetails>({});
  const { annualGrowth } = invesmentDetails;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<Form> = (data: Form) => {
    const { amount, numberOfYears, growthRate } = data;
    const investmentDetails = collectInvestmentDetails({
      amount: Number(amount),
      numberOfYears: Number(numberOfYears),
      growthRate: Number(growthRate),
    });
    setInvestmentDetails(investmentDetails);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <header>
        <h1>Investment panel</h1>
      </header>
      <section>
        <h2>Input</h2>
        <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
          <Controller
            name="growthRate"
            control={control}
            defaultValue=""
            rules={{ min: MIN_GROWTH_RATE, max: MAX_GROWTH_RATE }}
            render={({ field }) => (
              <TextField
                {...field}
                id="Growth rate"
                label="Growth rate"
                type="number"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.growthRate)}
                helperText={
                  Boolean(errors.growthRate) &&
                  `Input value should be between ${MIN_GROWTH_RATE} and ${MAX_GROWTH_RATE}`
                }
                fullWidth
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            rules={{ validate: { min: (v) => Number(v) > MIN_GROWTH_RATE } }}
            render={({ field }) => (
              <TextField
                {...field}
                id="Amount"
                label="Amount"
                type="number"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.amount)}
                helperText={Boolean(errors.amount) && `Input value should be greater than ${MIN_AMOUNT}`}
                fullWidth
              />
            )}
          />
          <Controller
            name="numberOfYears"
            control={control}
            defaultValue=""
            rules={{ min: MIN_NUMBER_OF_YEARS, max: MAX_NUMBER_OF_YEARS }}
            render={({ field }) => (
              <TextField
                {...field}
                id="Number of years"
                label="Number of years"
                type="number"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.numberOfYears)}
                helperText={`Input value between ${MIN_NUMBER_OF_YEARS} and ${MAX_NUMBER_OF_YEARS}`}
                fullWidth
              />
            )}
          />
          <Button color="primary" variant="contained" type="submit" fullWidth>
            Calculate
          </Button>
        </form>
      </section>
      <h2>Investment</h2>
      <section>
        {annualGrowth ? (
          <List>
            {annualGrowth.map((amount: number, index: number) => (
              <InvestmentListItem key={amount} year={index} amount={amount} />
            ))}
          </List>
        ) : (
          <span>Please fill in investment form</span>
        )}
      </section>
    </div>
  );
}

const EnhancedInvestmentPanel = memo(withPremiumAccountNotification(withGrowthRateProvider(InvestmentPanel)));

export default EnhancedInvestmentPanel;
