import { useMemo } from "react";

const EMPTY_VALUE = "";

interface Props {
  growthRate: number | null;
}

export default function useDefaultFormValues({ growthRate }: Props) {
  const defaultValues = useMemo(
    () => ({
      growthRate: growthRate == null ? EMPTY_VALUE : growthRate,
      amount: EMPTY_VALUE,
      numberOfYears: EMPTY_VALUE,
    }),
    [growthRate],
  );

  return defaultValues;
}
