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
    return plainToClass(Rating, fetchRatingById(id));
  }

  @FieldResolver()
  public user(@Root() rating: Rating): User {
    return plainToClass(User, fetchUserById(rating.user.id));
  }

  @FieldResolver()
  public restaurant(@Root() rating: Rating): Restaurant {
    return plainToClass(Restaurant, findRestaurantById(rating.restaurant.id));
  }
}
