import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "@reach/router";
import gql from "graphql-tag";
import { RestaurantCard } from "./RestaurantCard";
import { Row, Col } from "../base/Grid";
import { PaginatedResponse, Restaurant } from "../../typings";
import { Spinner } from "../base/Spinner";
import { Spacer } from "../base/Spacer";
import { PageHeader } from "../base/Headers";

const GET_RESTAURANTS = gql`
  {
    restaurants {
      items {
        id
        title
        description
        creationDate
        averageRating
      }
    }
    recommendation {
      id
    }
  }
`;

export const RestaurantOverview = () => {
  const { data, loading } = useQuery<{
    restaurants: PaginatedResponse<Restaurant>;
    recommendation: null | { id: string };
  }>(GET_RESTAURANTS);
  if (loading || !data) {
    return <Spinner />;
  }
  const { recommendation } = data;

  return (
    <>
      <PageHeader>Random Recommendation</PageHeader>
      <Link to={`/restaurants/${recommendation!.id}`}>I feel lucky</Link>
      <PageHeader>Nearby</PageHeader>
      <Spacer />
      <Row>
        {data.restaurants.items.map(n => (
          <Col key={`res-${n.id}`} fullWidth>
            <RestaurantCard restaurant={n} />
          </Col>
        ))}
      </Row>
    </>
  );
};
