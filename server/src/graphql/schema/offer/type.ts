import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Restaurant } from "../restaurant/type";
import { PaginatedResponse } from "../util";

@ObjectType()
export class Offer {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  validUntilDate: Date;

  @Field(() => Restaurant)
  restaurant: Restaurant;
}

@ObjectType()
export class OffersResponse extends PaginatedResponse(Offer) {}

@InputType()
export class CreateOfferInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  validUntilDate: Date;

  @Field(() => String)
  restaurantId: string;
}
