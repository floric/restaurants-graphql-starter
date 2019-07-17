import React, { FC } from "react";
import { Card } from "../base/Card";

interface RestaurantCardProps {
  name: string;
  description: string;
  link: string;
  rating: number;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  description,
  link,
  name,
  rating
}) => (
  <Card header={name}>
    <p>Rating: {rating}</p>
    <p>{description}</p>
    <p>
      <a href={link}>Website</a>
    </p>
  </Card>
);
