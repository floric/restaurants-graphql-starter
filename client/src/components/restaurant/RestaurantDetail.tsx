import React from "react";
import { FC } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "@reach/router";
import { formatDistanceToNow } from "date-fns";
import { Spinner } from "../base/Spinner";
import { PageHeader, ParagraphHeader, RatingHeader } from "../base/Headers";
import { Restaurant } from "../../typings";
import { Stars } from "../base/Stars";
import { Row, Col } from "../base/Grid";
import { CreateRatingForm } from "./CreateRatingForm";
import { Spacer } from "../base/Spacer";

const GET_RESTAURANT_DETAIL = gql`
  query getRestaurant($id: String!) {
    restaurant(id: $id) {
      id
      title
      description
      creationDate
      averageRating
      offers {
        items {
          id
          title
          description
        }
      }
      ratings {
        items {
          id
          description
          title
          creationDate
          value
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const RestaurantDetail: FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useQuery<{ restaurant: Restaurant | null }>(
    GET_RESTAURANT_DETAIL,
    { variables: { id } }
  );
  if (loading) {
    return <Spinner />;
  } else if (error || !data) {
    return <p>Error</p>;
  }
  const { restaurant } = data;
  if (!restaurant) {
    return (
      <>
        <p>Restaurant not found.</p>
        <Link to="/">Back to Start</Link>
      </>
    );
  }

  const { title, description, averageRating, ratings, offers } = restaurant;
  const sortedRatings = Array.from(ratings.items);
  sortedRatings.sort(
    (a, b) =>
      new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
  );
  return (
    <>
      <PageHeader>{title}</PageHeader>
      <p>{description}</p>
      <ParagraphHeader>Special Offers</ParagraphHeader>
      {offers.items.map(({ description, title, id }) => (
        <div key={id}>
          <RatingHeader>{title}</RatingHeader>
          <p>{description}</p>
        </div>
      ))}
      <ParagraphHeader>Ratings</ParagraphHeader>
      {averageRating ? (
        <>
          Average: <Stars rating={averageRating} />
        </>
      ) : (
        "Not rated yet"
      )}
      {sortedRatings.map(
        ({
          id,
          title,
          user: { firstName, lastName },
          description,
          value,
          creationDate
        }) => (
          <div key={id}>
            <Row>
              <Col>
                <RatingHeader>{title}</RatingHeader>
              </Col>
              <Col>
                {formatDistanceToNow(new Date(creationDate), {
                  addSuffix: true
                })}
              </Col>
            </Row>
            <Stars rating={value || 0} />
            <p key={id}>
              {description} -{" "}
              <i>
                {firstName} {lastName}
              </i>
            </p>
          </div>
        )
      )}
      <Spacer />
      <RatingHeader>Submit new Rating</RatingHeader>
      <CreateRatingForm restaurantId={id} />
      <Spacer />
      <div>
        <Link to="/">Back to Start</Link>
      </div>
    </>
  );
};
