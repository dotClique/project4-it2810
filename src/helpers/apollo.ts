import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUrl = "http://it2810-24.idi.ntnu.no/api/graphql";

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default client;
