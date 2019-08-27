import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  ResolverInterface,
  Mutation
} from "type-graphql";
import { Offer, CreateOfferInput } from "./type";
import { plainToClass } from "class-transformer";
import { Restaurant } from "../restaurant/type";
import { findRestaurantById } from "../../persistence/restaurants";
import { fetchOfferById, createOffer } from "../../persistence/offer";

@Resolver(() => Offer)
export class OfferResolver implements ResolverInterface<Offer> {
  @Query(() => Offer, { nullable: true })
  async offer(@Arg("id") id: string) {
    return plainToClass(Offer, await fetchOfferById(id));
  }

  @FieldResolver()
  async restaurant(@Root() offer: Offer) {
    return plainToClass(
      Restaurant,
      await findRestaurantById(offer.restaurant.id)
    );
  }

  @Mutation(() => Offer)
  createOffer(@Arg("createInput")
  {
    title,
    description,
    validUntilDate,
    restaurantId
  }: CreateOfferInput) {
    return createOffer({
      title,
      description,
      validUntilDate,
      restaurantId
    });
  }
}
