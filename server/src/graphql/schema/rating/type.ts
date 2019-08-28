import { Field, Int, ObjectType, ID, InputType } from "type-graphql";
import { User } from "../user/type";
import { PaginatedResponse } from "../util";
import { Restaurant } from "../restaurant/type";
import { Min, Max, MinLength } from "class-validator";
import { PersistedRestaurant } from "../../persistence/restaurants";
import { PersistedUser } from "../../persistence/user";

@ObjectType()
export class Rating {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, {
    nullable: true
  })
  description?: string;

  @Field(() => Int)
  value: number;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => User)
  user: PersistedUser;

  @Field(() => Restaurant)
  restaurant: PersistedRestaurant;
}

@ObjectType()
export class RatingsResponse extends PaginatedResponse(Rating) {}

@InputType()
export class CreateRatingInput {
  @Field(() => String)
  @MinLength(3, { message: "Title should have at least 3 characters" })
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  @Min(0, { message: "Rating must not be lower then 0" })
  @Max(5, { message: "Rating must not be greater then 5" })
  value: number;

  @Field(() => String)
  restaurantId: string;
}
