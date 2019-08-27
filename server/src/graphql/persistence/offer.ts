import { getById, findPaginated, create } from "./util";

export type PersistedOffer = {
  title: string;
  description: string;
  validUntilDate: Date;
  restaurantId: string;
  userId: string;
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

type CreateOfferArgs = {
  title: string;
  description: string;
  restaurantId: string;
  validUntilDate: Date;
  userId: string;
};

export const createOffer = ({
  title,
  description,
  restaurantId,
  validUntilDate,
  userId
}: CreateOfferArgs) =>
  create<PersistedOffer>(
    {
      title,
      description,
      validUntilDate,
      restaurantId,
      userId
    },
    "offer"
  );
