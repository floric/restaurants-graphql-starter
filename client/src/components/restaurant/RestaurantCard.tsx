import React, { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "../base/Card";
import { Restaurant } from "../../typings";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurant: { title, description, averageRating, creationDate }
}) => (
  <Card header={title}>
    <p>{averageRating != null ? averageRating : "Not rated yet"}</p>
    <p>{description}</p>
    <p>
      Added {formatDistanceToNow(new Date(creationDate), { addSuffix: true })}
    </p>
  </Card>
);
