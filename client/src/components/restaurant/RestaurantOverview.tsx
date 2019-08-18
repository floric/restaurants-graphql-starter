import React, { FC } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RestaurantCard } from "./RestaurantCard";

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

export const RestaurantOverview: FC<{}> = () => {
  const { data, loading } = useQuery<{ restaurants: Array<any> }>(
    GET_RESTAURANTS
  );
  if (loading || !data) {
    return <p>Loading</p>;
  }

  return (
    <>
      {data.restaurants.map(n => (
        <RestaurantCard
          key={`res-${n.id}`}
          name={n.title}
          description={n.description}
          rating={3}
          link="https://google.de"
        />
      ))}
    </>
  );
};
