import axios, { AxiosResponse } from "axios";
import { User } from "../../types/user";
import { API_URL } from "../constants";

const url = `${API_URL}/users`;

async function fetchUser(id: string): Promise<AxiosResponse<User>> {
  return axios.get(`${url}/${id}`);
}

export default fetchUser;
