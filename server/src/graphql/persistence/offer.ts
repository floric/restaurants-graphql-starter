import { findPaginated, getById, create } from "./util";
import { CreateOfferInput } from "../schema/offer/type";

export type PersistedOffer = {
  title: string;
  description: string;
  validUntilDate: Date;
  creationDate: Date;
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

export const createOffer = ({
  title,
  description,
  restaurantId,
  validUntilDate
}: CreateOfferInput) => {
  const offer: PersistedOffer = {
    title,
    description,
    validUntilDate,
    restaurantId,
    creationDate: new Date()
  };

  return create<PersistedOffer>(offer, "offer");
};
