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
import { findRestaurantById } from "../../persistence/restaurants";
import {
  fetchOfferById,
  createOffer,
  PersistedOffer
} from "../../persistence/offer";
import { SYSTEM_USER } from "../../persistence/user";

@Resolver(() => Offer)
export class OfferResolver
  implements ResolverInterface<Offer & PersistedOffer> {
  @Query(() => Offer, { nullable: true })
  offer(@Arg("id") id: string) {
    return fetchOfferById(id);
  }

  @FieldResolver()
  async restaurant(@Root() { restaurantId }: PersistedOffer) {
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      throw Error("Offer refers to unknown restaurant");
    }
    return restaurant;
  }

  @Mutation(() => Offer)
  createOffer(@Arg("createInput")
  {
    title,
    description,
    restaurantId
  }: CreateOfferInput) {
    return createOffer({
      title,
      description,
      restaurantId,
      userId: SYSTEM_USER.id
    });
  }
}
