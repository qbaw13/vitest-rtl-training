import { memo } from "react";
import { ListItem, ListItemText } from "@mui/material";

export interface InvestmentListItemProps {
  year: number;
  amount: number;
}

function InvestmentListItem({ year, amount }: InvestmentListItemProps) {
  return (
    <ListItem>
      <ListItemText>year {year}</ListItemText>
      <ListItemText>{amount}</ListItemText>
    </ListItem>
  );
}

const EnhancedInvestmentListItem = memo(InvestmentListItem);

export default EnhancedInvestmentListItem;
