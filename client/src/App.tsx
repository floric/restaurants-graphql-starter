import React from "react";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/react-common";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faStarHalfAlt,
  faUtensils,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@reach/router";
import { Grid } from "./components/base/Grid";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";

library.add(faStar, faStarHalfAlt, faUtensils, faSpinner);

const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true,
  link: createHttpLink({
    uri: "http://localhost:3030/api"
  })
});

const GlobalStyle = createGlobalStyle`
  a, p, input, textarea, li, ul {
    font-family: 'Source Sans Pro', sans-serif;
  }
  h1, h2, h3, h4, h5 {
    font-family: "Playfair Display", serif;
  }
  a {
    color: #00825a;
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Grid>
      <Router>
        <StartPage path="/" />
        <DetailPage path="/restaurants/:id" />
      </Router>
    </Grid>
  </ApolloProvider>
);

export default App;
