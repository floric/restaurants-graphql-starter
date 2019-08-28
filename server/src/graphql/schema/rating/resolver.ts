import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  ResolverInterface,
  Mutation
} from "type-graphql";
import { Rating, CreateRatingInput } from "./type";
import { fetchUserById, SYSTEM_USER } from "../../persistence/user";
import {
  fetchRatingById,
  createRating,
  PersistedRating
} from "../../persistence/ratings";
import { findRestaurantById } from "../../persistence/restaurants";

@Resolver(() => Rating)
export class RatingResolver
  implements ResolverInterface<Rating & PersistedRating> {
  @Query(() => Rating, { nullable: true })
  rating(@Arg("id") id: string) {
    return fetchRatingById(id);
  }

  @FieldResolver()
  async user(@Root() { userId }: PersistedRating) {
    const user = await fetchUserById(userId);
    if (!user) {
      throw Error("Rating refers to unknown user");
    }
    return user;
  }

  @FieldResolver()
  async restaurant(@Root() { restaurantId }: PersistedRating) {
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      throw Error("Rating refers to unknown restaurant");
    }
    return restaurant;
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
      userId: SYSTEM_USER.id
    });
  }
}
