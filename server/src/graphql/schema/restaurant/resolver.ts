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

import { Restaurant, RestaurantResponse, CreateRestaurantInput } from "./type";
import {
  fetchRatingsForRestaurant,
  fetchAvgRatingForRestaurant
} from "../../persistence/ratings";
import {
  fetchRestaurants,
  findRestaurantByTitle,
  createRestaurant,
  PersistedRestaurant
} from "../../persistence/restaurants";
import { fetchOffersForRestaurant } from "../../persistence/offer";
import { RatingsResponse } from "../rating/type";
import { OffersResponse } from "../offer/type";
import { PaginatedListInput } from "../util";

@Resolver(() => Restaurant)
export class RestaurantResolver
  implements ResolverInterface<Restaurant & PersistedRestaurant> {
  @Query(() => Restaurant, { nullable: true })
  restaurant(@Arg("title") title: string) {
    return findRestaurantByTitle(title);
  }

  @Query(() => RestaurantResponse)
  restaurants() {
    return fetchRestaurants();
  }

  @FieldResolver(() => RatingsResponse)
  ratings(
    @Root() { id }: PersistedRestaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ) {
    return fetchRatingsForRestaurant(id, page, pageSize);
  }

  @FieldResolver(() => OffersResponse)
  offers(
    @Root() { id }: PersistedRestaurant,
    @Args() { page, pageSize }: PaginatedListInput
  ) {
    return fetchOffersForRestaurant(id, page, pageSize);
  }

  @FieldResolver()
  averageRating(@Root() { id }: PersistedRestaurant) {
    return fetchAvgRatingForRestaurant(id);
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
