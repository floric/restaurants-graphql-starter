import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ResolverInterface,
  Int
} from "type-graphql";

import { Restaurant } from "./type";

@Resolver(() => Restaurant)
export class RestaurantResolver implements ResolverInterface<Restaurant> {
  private readonly items: Restaurant[] = [];

  @Query(() => Restaurant, { nullable: true })
  public async restaurant(
    @Arg("title") title: string
  ): Promise<Restaurant | undefined> {
    return await this.items.find(a => a.title === title);
  }

  @Query(() => [Restaurant])
  public async restaurants(): Promise<Restaurant[]> {
    return await this.items;
  }

  @FieldResolver()
  public ratingsCount(
    @Root() restaurant: Restaurant,
    @Arg("minRate", () => Int, { defaultValue: 0.0 }) minRate: number
  ): number {
    return restaurant.ratings.filter(rating => rating >= minRate).length;
  }
}
