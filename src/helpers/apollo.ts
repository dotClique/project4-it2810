import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getEnv } from "./utils";

//const apiUrl = "http://it2810-24.idi.ntnu.no/api/graphql";
const apiUrl = getEnv("graphqlUrl");

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default client;
