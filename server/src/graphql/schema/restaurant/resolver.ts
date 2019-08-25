import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ResolverInterface,
  Args,
  Mutation
} from "type-graphql";
import { plainToClass } from "class-transformer";

import { Restaurant, RestaurantResponse, CreateRestaurantInput } from "./type";
import {
  fetchRatingsForRestaurant,
  fetchAvgRatingForRestaurant
} from "../../persistence/ratings";
import {
  fetchRestaurants,
  findRestaurantByTitle,
  createRestaurant
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
    const { items } = await fetchRestaurants();
    return {
      items: items.map(n => plainToClass(Restaurant, n)),
      hasMore: false
    };
  }

  @FieldResolver(() => RatingsResponse)
  public async ratings(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ): Promise<RatingsResponse> {
    const { items } = await fetchRatingsForRestaurant(
      restaurant.id,
      page,
      pageSize
    );
    return {
      items: items.map(n => plainToClass(Rating, n)),
      hasMore: false
    };
  }

  @FieldResolver(() => OffersResponse)
  public async offers(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ): Promise<RatingsResponse> {
    const { items } = await fetchOffersForRestaurant(
      restaurant.id,
      page,
      pageSize
    );
    return {
      items: items.map(n => plainToClass(Rating, n)),
      hasMore: false
    };
  }

  @FieldResolver()
  public averageRating(@Root() restaurant: Restaurant): number {
    return fetchAvgRatingForRestaurant(restaurant.id);
  }

  @Mutation(() => Restaurant)
  public createRestaurant(
    @Arg("createInput") createInput: CreateRestaurantInput
  ) {
    return createRestaurant(createInput);
  }
}
