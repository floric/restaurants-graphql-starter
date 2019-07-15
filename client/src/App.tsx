import React, { FC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from 'graphql-tag';

import { ContentQuery } from './util/content-query';

const GET_RESTAURANTS = gql`{
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
 }`;

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
    <ContentQuery<{ restaurants: Array<{ title: string, id: string, description: string, creationDate: Date }> }> query={GET_RESTAURANTS}>
      {res => res.restaurants.map(n => <div key={`res-${n.id}`}><h3>{n.title}</h3><p>{n.description}</p><p>Created {n.creationDate}</p></div>)}
    </ContentQuery>
  </ApolloProvider>
);

export default App;
