import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  ResolverInterface
} from "type-graphql";
import { User } from "../user/type";
import { Rating } from "./type";
import { fetchUserById } from "../../persistence/user";
import { fetchRatingById } from "../../persistence/ratings";
import { plainToClass } from "class-transformer";
import { Restaurant } from "../restaurant/type";
import { findRestaurantById } from "../../persistence/restaurants";

@Resolver(() => Rating)
export class RatingResolver implements ResolverInterface<Rating> {
  @Query(() => Rating, { nullable: true })
  public async rating(@Arg("id") id: string): Promise<Rating | undefined> {
    return plainToClass(Rating, await fetchRatingById(id));
  }

  @FieldResolver()
  public async user(@Root() rating: Rating): Promise<User> {
    return plainToClass(User, await fetchUserById(rating.user.id));
  }

  @FieldResolver()
  public async restaurant(@Root() rating: Rating): Promise<Restaurant> {
    return plainToClass(
      Restaurant,
      await findRestaurantById(rating.restaurant.id)
    );
  }
}
