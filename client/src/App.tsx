import React, { FC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from 'graphql-tag';

import './App.css';
import { ContentQuery } from './util/content-query';

const GET_RESTAURANTS = gql`
 {
   restaurants {
     title
     description
     ratingsCount
     creationDate
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
    <ContentQuery<{ restaurants: Array<{ title: string }> }> query={GET_RESTAURANTS}>
      {res => res.restaurants.map(n => <div>{n.title}</div>)}
    </ContentQuery>
  </ApolloProvider>
);

export default App;
