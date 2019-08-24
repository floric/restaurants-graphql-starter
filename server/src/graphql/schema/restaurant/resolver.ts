import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ResolverInterface,
  Args
} from "type-graphql";
import { plainToClass } from "class-transformer";

import { Restaurant, RestaurantResponse } from "./type";
import {
  fetchRatingsForRestaurant,
  fetchAvgRatingForRestaurant
} from "../../persistence/ratings";
import {
  fetchRestaurants,
  findRestaurantByTitle
} from "../../persistence/restaurants";
import { fetchOffersForRestaurant } from "../../persistence/offer";
import { RatingsResponse, Rating } from "../rating/type";
import { OffersResponse } from "../offer/type";
import { PaginatedListInput } from "../util";

@Resolver(() => Restaurant)
export class RestaurantResolver implements ResolverInterface<Restaurant> {
  @Query(() => Restaurant, { nullable: true })
  public async restaurant(
    @Arg("title") title: string
  ): Promise<Restaurant | undefined> {
    return plainToClass(Restaurant, findRestaurantByTitle(title));
  }

  @Query(() => RestaurantResponse)
  public async restaurants(): Promise<RestaurantResponse> {
    const { items, total } = fetchRestaurants();
    return {
      items: items.map(n => plainToClass(Restaurant, n)),
      hasMore: false,
      total
    };
  }

  @FieldResolver(() => RatingsResponse)
  public ratings(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ): RatingsResponse {
    const { items, total } = fetchRatingsForRestaurant(
      restaurant.id,
      page,
      pageSize
    );
    return {
      items: items.map(n => plainToClass(Rating, n)),
      hasMore: false,
      total
    };
  }

  @FieldResolver(() => OffersResponse)
  public offers(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ): RatingsResponse {
    const { items, total } = fetchOffersForRestaurant(
      restaurant.id,
      page,
      pageSize
    );
    return {
      items: items.map(n => plainToClass(Rating, n)),
      hasMore: false,
      total
    };
  }

  @FieldResolver()
  public averageRating(@Root() restaurant: Restaurant): number {
    return fetchAvgRatingForRestaurant(restaurant.id);
  }
}
