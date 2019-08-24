import { v4 as generateUuid } from "uuid";
import faker from "faker";
import { PaginatedReponse } from "./util";

export type PersistedRestaurant = {};

export const fetchRestaurants = (): PaginatedReponse<PersistedRestaurant> => {
  const items: PersistedRestaurant[] = new Array(10).fill(0).map(() => ({
    id: generateUuid(),
    creationDate: faker.date.past(2018),
    description: faker.lorem.paragraph(5),
    title: faker.commerce.product()
  }));

  return { items, page: 0, pageCount: 1, total: items.length };
};

export const findRestaurantByTitle = (title: string) => ({
  id: generateUuid(),
  creationDate: faker.date.past(2018),
  description: faker.lorem.paragraph(5),
  title
});

export const findRestaurantById = (restaurantId: string) => ({
  id: restaurantId,
  creationDate: faker.date.past(2018),
  description: faker.lorem.paragraph(5),
  title: "test"
});
