import { Field, Int, ObjectType, ID, InputType } from "type-graphql";
import { User } from "../user/type";
import { PaginatedResponse } from "../util";
import { Restaurant } from "../restaurant/type";
import { Min, Max } from "class-validator";

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
  user: User;

  @Field(() => Restaurant)
  restaurant: Restaurant;
}

@ObjectType()
export class RatingsResponse extends PaginatedResponse(Rating) {}

@InputType()
export class CreateRatingInput {
  @Field(() => String)
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
