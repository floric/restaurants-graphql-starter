import { Field, Int, ObjectType, ID } from "type-graphql";
import { User } from "../user/type";
import { PaginatedResponse } from "../util";
import { Restaurant } from "../restaurant/type";

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
