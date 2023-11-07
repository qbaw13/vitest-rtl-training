import { ComponentType } from "react";
import { GrowthRateProvider } from "../../../contexts/GrowthRateContext";

function withGrowthRateProvider<T extends object>(WrappedComponent: ComponentType<T>) {
  return function Wrapper(props: T) {
    return (
      <GrowthRateProvider>
        <WrappedComponent {...props} />
      </GrowthRateProvider>
    );
  };
}

export default withGrowthRateProvider;
