import { ApolloError, useQuery } from "@apollo/client";
import { createContext, ReactNode, useMemo } from "react";
import FETCH_GROWTH_RATE from "../api/graphql/fetch-growth-rate";

const GROWTH_RATE_ID = 1;

const GrowthRateContext = createContext<{
  loading: boolean;
  error?: ApolloError;
  growthRate: number | null;
}>({
  loading: false,
  growthRate: null,
});

interface Props {
  children: ReactNode;
}

const normalizeGrowthRate = (percentageGrowthRate: number) => percentageGrowthRate / 100;

export function GrowthRateProvider({ children }: Props) {
  const { loading, error, data } = useQuery(FETCH_GROWTH_RATE, {
    variables: {
      id: GROWTH_RATE_ID,
    },
  });

  const growthRate = useMemo(() => {
    if (!data?.growthRate) {
      return null;
    }
    const {
      growthRate: { percentageRate },
    } = data;
    return normalizeGrowthRate(percentageRate);
  }, [data]);

  const value = useMemo(
    () => ({
      loading,
      error,
      growthRate,
    }),
    [loading, error, growthRate],
  );

  return <GrowthRateContext.Provider value={value}>{children}</GrowthRateContext.Provider>;
}

export default GrowthRateContext;
