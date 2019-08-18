import React, { FC } from "react";
import { ApolloProvider } from "@apollo/react-common";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { RestaurantOverview } from "./components/restaurant/RestaurantOverview";

const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true,
  link: createHttpLink({
    uri: "http://localhost:3030/api"
  })
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <RestaurantOverview />
  </ApolloProvider>
);

export default App;
