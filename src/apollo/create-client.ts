import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { API_URL } from "../api/constants";

export default function createClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
}
