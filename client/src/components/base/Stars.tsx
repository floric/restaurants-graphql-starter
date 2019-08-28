import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Stars: FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = fullStars !== rating;

  return (
    <span>
      {Array(fullStars)
        .fill(1)
        .map((_, i) => (
          <FontAwesomeIcon key={i} icon="star" />
        ))}
      {halfStar ? <FontAwesomeIcon icon="star-half-alt" /> : null}
    </span>
  );
};
