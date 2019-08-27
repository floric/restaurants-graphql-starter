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
  async restaurant(@Arg("title") title: string) {
    return plainToClass(Restaurant, findRestaurantByTitle(title));
  }

  @Query(() => RestaurantResponse)
  async restaurants() {
    const { items } = await fetchRestaurants();
    return {
      items: items.map(n => plainToClass(Restaurant, n)),
      hasMore: false
    };
  }

  @FieldResolver(() => RatingsResponse)
  async ratings(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ) {
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
  async offers(
    @Root() restaurant: Restaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ) {
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
  averageRating(@Root() restaurant: Restaurant) {
    return fetchAvgRatingForRestaurant(restaurant.id);
  }

  @Mutation(() => Restaurant)
  createRestaurant(@Arg("createInput")
  {
    title,
    description
  }: CreateRestaurantInput) {
    return createRestaurant({ title, description, userId: "" });
  }
}
