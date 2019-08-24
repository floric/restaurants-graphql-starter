import { PaginatedReponse } from "./util";

export type PersistedOffer = {
  id: string;
  title: string;
  description: string;
  validUntilDate: Date;
  restaurantId: string;
};

export const fetchOfferById = (ratingId: string): PersistedOffer => ({
  id: ratingId,
  title: "abc",
  description: "test",
  restaurantId: "test",
  validUntilDate: new Date()
});

export const fetchOffersForRestaurant = (
  restaurantId: string,
  page: number,
  count: number
): PaginatedReponse<PersistedOffer> => {
  const items: Array<PersistedOffer> = Array(count).map(() => ({
    id: "abc",
    title: "headline",
    description: "test",
    restaurantId,
    validUntilDate: new Date()
  }));

  return { items, page, pageCount: count, total: items.length };
};
