import { v4 as generateUuid } from "uuid";
import faker from "faker";
import { findPaginated, getById, create } from "./util";

export type PersistedRestaurant = {
  title: string;
  description?: string;
  userId: string;
};

export const fetchRestaurants = () =>
  findPaginated<PersistedRestaurant>({ type: "restaurant" });

export const findRestaurantByTitle = (title: string) => ({
  id: generateUuid(),
  creationDate: faker.date.past(2018),
  description: faker.lorem.paragraph(5),
  title
});

export const findRestaurantById = (restaurantId: string) =>
  getById<PersistedRestaurant>(restaurantId);

type CreateRestaurantArgs = {
  title: string;
  description?: string;
  userId: string;
};

export const createRestaurant = ({
  title,
  description,
  userId
}: CreateRestaurantArgs) => {
  const restaurant: PersistedRestaurant = {
    title,
    description,
    userId
  };
  return create<PersistedRestaurant>(restaurant, "restaurant");
};
