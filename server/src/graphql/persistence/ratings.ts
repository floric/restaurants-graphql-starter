import { findPaginated, getById, create } from "./util";

export type PersistedRating = {
  restaurantId: string;
  title: string;
  description?: string;
  value: number;
  creationDate: Date;
  userId: string;
};

export const fetchRatingById = (ratingId: string) =>
  getById<PersistedRating>(ratingId);

export const fetchRatingsForRestaurant = (
  restaurantId: string,
  page: number,
  count: number
) =>
  findPaginated<PersistedRating>({
    type: "rating",
    page,
    count,
    selector: { restaurantId }
  });

export const fetchAvgRatingForRestaurant = (_: string) => 4.5;

type CreateRatingArgs = {
  title: string;
  description?: string;
  value: number;
  restaurantId: string;
  userId: string;
};

export const createRating = ({
  title,
  description,
  value,
  restaurantId,
  userId
}: CreateRatingArgs) => {
  const rating: PersistedRating = {
    title,
    description,
    value,
    restaurantId,
    userId,
    creationDate: new Date()
  };

  return create<PersistedRating>(rating, "rating");
};
