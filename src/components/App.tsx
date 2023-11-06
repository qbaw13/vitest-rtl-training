import { ChangeEvent, useState } from "react";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import useInvestmentDetails from "./hooks/useInvestmentDetails";
import { MAX_NUMBER_OF_YEARS, MIN_AMOUNT, MIN_NUMBER_OF_YEARS } from "../constants";

function App() {
  const [amount, setAmount] = useState<number | null>(null);
  const [numberOfYears, setNumberOfYears] = useState<number | null>(null);
  const { annualGrowth } = useInvestmentDetails(amount, numberOfYears);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event == null || event.target == null) {
      return;
    }
    if (event.target.value === "") {
      setAmount(null);
    } else {
      setAmount(Number(event.target.value));
    }
  };

  const handleNumberOfYearsChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event == null || event.target == null) {
      return;
    }
    if (event.target.value === "") {
      setNumberOfYears(null);
    } else {
      setNumberOfYears(Number(event.target.value));
    }
  };

  const amountError =
    amount != null && amount <= MIN_AMOUNT;

  const numberOfYearsError =
    numberOfYears != null && (numberOfYears < MIN_NUMBER_OF_YEARS || numberOfYears > MAX_NUMBER_OF_YEARS);

  return (
    <div className="App">
      <header>
        <h1>Investment panel</h1>
      </header>
      <section>
        <h2>Input</h2>
        <TextField
          error={amountError}
          id="Amount"
          label="Amount"
          type="number"
          variant="outlined"
          margin="normal"
          onChange={handleAmountChange}
          helperText={`Input value higher than ${MIN_AMOUNT}`}
          fullWidth
        />
        <TextField
          error={numberOfYearsError}
          id="Number of years"
          label="Number of years"
          type="number"
          variant="outlined"
          margin="normal"
          onChange={handleNumberOfYearsChange}
          helperText={`Input value between ${MIN_NUMBER_OF_YEARS} and ${MAX_NUMBER_OF_YEARS}`}
          fullWidth
        />
      </section>
      <h2>Investment</h2>
      <section>
        {annualGrowth ? (
          <List>
            {annualGrowth.map((amount: number, index: number) => (
              <ListItem key={index}>
                <ListItemText>year {index}</ListItemText>
                <ListItemText>{amount}</ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <span>Please fill in investment form</span>
        )}
      </section>
    </div>
  );
}

export default App;
