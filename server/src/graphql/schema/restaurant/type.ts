import { Field, Float, ID, ObjectType, InputType } from "type-graphql";
import { PaginatedResponse } from "../util";

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
  get averageRating(): number | null {
    return 3.53;
  }
}

@ObjectType()
export class RestaurantResponse extends PaginatedResponse(Restaurant) {}

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
