import { Field, Float, ID, ObjectType, InputType } from "type-graphql";
import { PaginatedResponse } from "../util";
import { MinLength } from "class-validator";

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, {
    nullable: true
  })
  description?: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => Float, { nullable: true })
  averageRating: number | null;
}

@ObjectType()
export class RestaurantResponse extends PaginatedResponse(Restaurant) {}

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  @MinLength(3, { message: "Title should have at least 3 characters" })
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
