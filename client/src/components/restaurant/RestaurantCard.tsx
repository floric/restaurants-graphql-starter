import React, { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@reach/router";
import { Card } from "../base/Card";
import { Restaurant } from "../../typings";
import { Stars } from "../base/Stars";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurant: { id, title, description, averageRating, creationDate }
}) => (
  <Card header={title}>
    <p>
      {averageRating != null ? (
        <Stars rating={averageRating} />
      ) : (
        "Not rated yet"
      )}
    </p>
    <p>
      {description.length > 60
        ? `${description.substr(0, 57)}...`
        : description}
    </p>
    <p>
      Added {formatDistanceToNow(new Date(creationDate), { addSuffix: true })}
    </p>
    <p>
      <Link to={`/restaurants/${id}`}>More Details</Link>
    </p>
  </Card>
);
