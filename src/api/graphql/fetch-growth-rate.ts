import { gql } from "@apollo/client";

const FETCH_GROWTH_RATE = gql`
  query FetchGrowthRate($id: Int!) {
    growthRate(id: $id) {
      id
      percentageRate
    }
  }
`;

export default FETCH_GROWTH_RATE;
