import { PaginatedReponse } from "./util";

export type PersistedRating = {
  id: string;
  restaurantId: string;
  title: string;
  value: number;
  creationDate: Date;
  userId: string;
};

export const fetchRatingById = (ratingId: string): PersistedRating => ({
  id: ratingId,
  restaurantId: "abc",
  title: "abc",
  value: 1,
  creationDate: new Date(),
  userId: "abc"
});

export const fetchRatingsForRestaurant = (
  restaurantId: string,
  page: number,
  count: number
): PaginatedReponse<PersistedRating> => {
  const items: Array<PersistedRating> = Array(count).map(() => ({
    id: "abc",
    restaurantId,
    title: "abc",
    value: 1,
    creationDate: new Date(),
    userId: "abc"
  }));

  return { items, page, pageCount: count, total: items.length };
};

export const fetchAvgRatingForRestaurant = (_: string) => 4.5;
