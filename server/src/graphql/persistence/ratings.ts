import { findPaginated, getById, create, DbEntity } from "./util";

export type PersistedRating = {
  restaurantId: string;
  title: string;
  description?: string;
  value: number;
  userId: string;
} & DbEntity;

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
}: CreateRatingArgs) =>
  create<PersistedRating>(
    {
      title,
      description,
      value,
      restaurantId,
      userId
    },
    "rating"
  );
