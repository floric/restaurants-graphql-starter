import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Restaurant } from "../restaurant/type";
import { PaginatedResponse } from "../util";
import { MinLength } from "class-validator";
import { PersistedRestaurant } from "../../persistence/restaurants";

@ObjectType()
export class Offer {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Restaurant)
  restaurant: PersistedRestaurant;
}

@ObjectType()
export class OffersResponse extends PaginatedResponse(Offer) {}

@InputType()
export class CreateOfferInput {
  @Field(() => String)
  @MinLength(3, { message: "Title should have at least 3 characters" })
  title: string;

  @Field(() => String)
  @MinLength(3, { message: "Description should have at least 3 characters" })
  description: string;

  @Field(() => String)
  restaurantId: string;
}
