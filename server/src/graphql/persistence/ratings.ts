import { findPaginated, getById } from "./util";

export type PersistedRating = {
  restaurantId: string;
  title: string;
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
