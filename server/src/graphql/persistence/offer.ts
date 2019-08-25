import { findPaginated, getById } from "./util";

export type PersistedOffer = {
  title: string;
  description: string;
  validUntilDate: Date;
  restaurantId: string;
};

export const fetchOfferById = (ratingId: string) =>
  getById<PersistedOffer>(ratingId);

export const fetchOffersForRestaurant = (
  restaurantId: string,
  page: number,
  count: number
) =>
  findPaginated<PersistedOffer>({
    type: "offer",
    page,
    count,
    selector: { restaurantId }
  });
