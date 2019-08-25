import { v4 as generateUuid } from "uuid";
import faker from "faker";
import { findPaginated, getById, create } from "./util";

export type PersistedRestaurant = { title: string; description?: string };

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

export const createRestaurant = (restaurant: PersistedRestaurant) =>
  create<PersistedRestaurant>(restaurant, "restaurant");
