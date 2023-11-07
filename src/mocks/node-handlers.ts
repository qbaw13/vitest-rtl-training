import { http, graphql, HttpResponse } from "msw";
import { API_URL } from "../api/constants";
import { createUser } from "./__fixtures__/create-user.fixture";

export const handlers = [
  http.get(`${API_URL}/users/:id`, ({ params }) => {
    const user = createUser({ id: Number(params.id) });
    return HttpResponse.json(user);
  }),
  http.get(`${API_URL}/growthRates/1`, () => {
    return HttpResponse.json(53);
  }),
  graphql.query("FetchGrowthRate", () => {
    return HttpResponse.json({ data: { growthRate: { id: 1, percentageRate: 53 } } });
  }),
];
