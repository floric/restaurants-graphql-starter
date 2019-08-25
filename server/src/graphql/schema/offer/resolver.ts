import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  ResolverInterface
} from "type-graphql";
import { Offer } from "./type";
import { plainToClass } from "class-transformer";
import { Restaurant } from "../restaurant/type";
import { findRestaurantById } from "../../persistence/restaurants";
import { fetchOfferById } from "../../persistence/offer";

@Resolver(() => Offer)
export class OfferResolver implements ResolverInterface<Offer> {
  @Query(() => Offer, { nullable: true })
  public async offer(@Arg("id") id: string): Promise<Offer | undefined> {
    return plainToClass(Offer, await fetchOfferById(id));
  }

  @FieldResolver()
  public async restaurant(@Root() offer: Offer): Promise<Restaurant> {
    return plainToClass(
      Restaurant,
      await findRestaurantById(offer.restaurant.id)
    );
  }
}
