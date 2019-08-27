import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  ResolverInterface,
  Mutation
} from "type-graphql";
import { User } from "../user/type";
import { Rating, CreateRatingInput } from "./type";
import { fetchUserById } from "../../persistence/user";
import {
  fetchRatingById,
  createRating,
  PersistedRating
} from "../../persistence/ratings";
import { plainToClass } from "class-transformer";
import { Restaurant } from "../restaurant/type";
import { findRestaurantById } from "../../persistence/restaurants";

@Resolver(() => Rating)
export class RatingResolver
  implements ResolverInterface<Rating & PersistedRating> {
  @Query(() => Rating, { nullable: true })
  async rating(@Arg("id") id: string) {
    return plainToClass(Rating, await fetchRatingById(id));
  }

  @FieldResolver()
  async user(@Root() rating: PersistedRating) {
    return plainToClass(User, await fetchUserById(rating.userId));
  }

  @FieldResolver()
  async restaurant(@Root() rating: PersistedRating) {
    return plainToClass(
      Restaurant,
      await findRestaurantById(rating.restaurantId)
    );
  }

  @Mutation(() => Rating)
  createRating(@Arg("createInput")
  {
    title,
    description,
    value,
    restaurantId
  }: CreateRatingInput) {
    return createRating({
      title,
      description,
      value,
      restaurantId,
      userId: ""
    });
  }
}
