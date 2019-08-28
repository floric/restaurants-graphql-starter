import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RestaurantCard } from "./RestaurantCard";
import { PaginatedResponse, Restaurant } from "../../typings";

const GET_RESTAURANTS = gql`
  {
    restaurants {
      items {
        id
        title
        description
        creationDate
        averageRating
        ratings {
          items {
            user {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export const RestaurantOverview = () => {
  const { data, loading } = useQuery<{
    restaurants: PaginatedResponse<Restaurant>;
  }>(GET_RESTAURANTS);
  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data.restaurants.items.map(n => (
        <RestaurantCard key={`res-${n.id}`} restaurant={n} />
      ))}
    </>
  );
};
