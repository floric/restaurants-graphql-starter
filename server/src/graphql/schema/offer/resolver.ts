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
    return plainToClass(Offer, fetchOfferById(id));
  }

  @FieldResolver()
  public restaurant(@Root() offer: Offer): Restaurant {
    return plainToClass(Restaurant, findRestaurantById(offer.restaurant.id));
  }
}
