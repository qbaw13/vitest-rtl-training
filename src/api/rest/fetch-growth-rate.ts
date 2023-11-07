import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constants";

const url = `${API_URL}/growthRates/1`;

async function fetchGrowthRate(): Promise<AxiosResponse<{ percentageRate: number }>> {
  return axios.get(url);
}

export default fetchGrowthRate;
