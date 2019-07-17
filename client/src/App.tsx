import React, { FC } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import { ContentQuery } from "./util/content-query";
import { RestaurantCard } from "./components/restaurant/RestaurantCard";

const GET_RESTAURANTS = gql`
  {
    restaurants {
      id
      title
      description
      ratingsCount
      creationDate
      ratings {
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

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
    <ContentQuery<{
      restaurants: Array<{
        title: string;
        id: string;
        description: string;
        creationDate: Date;
      }>;
    }>
      query={GET_RESTAURANTS}
    >
      {res =>
        res.restaurants.map(n => (
          <RestaurantCard
            key={`res-${n.id}`}
            name={n.title}
            description={n.description}
            rating={3}
            link="https://google.de"
          />
        ))
      }
    </ContentQuery>
  </ApolloProvider>
);

export default App;
