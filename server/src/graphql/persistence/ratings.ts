import { findPaginated, getById, create, DbEntity } from "./util";
import { getDb } from "./db";

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

export const fetchRatingsForUser = (
  userId: string,
  page: number,
  count: number
) =>
  findPaginated<PersistedRating>({
    type: "rating",
    page,
    count,
    selector: { userId }
  });

export const fetchAvgRatingForRestaurant = async (restaurantId: string) => {
  const { docs } = await getDb<PersistedRating & DbEntity>().find({
    selector: { restaurantId, type: "rating" }
  });
  const sum = docs.map(r => r.value).reduce((a, b) => a + b, 0);
  return sum / docs.length;
};

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
