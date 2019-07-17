import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ResolverInterface,
  Int
} from "type-graphql";
import { v4 as generateUuid } from "uuid";
import faker from "faker";

import { Restaurant } from "./type";
import { Rating } from "../rating/type";

@Resolver(() => Restaurant)
export class RestaurantResolver implements ResolverInterface<Restaurant> {
  private readonly items: Restaurant[] = new Array(100).fill(0).map(() => {
    const n = new Restaurant();
    n.creationDate = faker.date.past(2018);
    n.description = faker.lorem.paragraph(20);
    n.title = faker.commerce.product();
    n.id = generateUuid();
    return n;
  });

  @Query(() => Restaurant, { nullable: true })
  public async restaurant(
    @Arg("title") title: string
  ): Promise<Restaurant | undefined> {
    return await this.items.find(a => a.title === title);
  }

  @Query(() => [Restaurant])
  public async restaurants(): Promise<Restaurant[]> {
    return await this.items;
  }

  @FieldResolver(() => [Rating])
  public ratings(
    @Root() _: Restaurant,
    @Arg("minRate", () => Int, { defaultValue: 0.0 }) __: number
  ): Rating[] {
    const ratingA = new Rating();
    ratingA.id = "abc";
    ratingA.title = "Horrible experience";
    ratingA.value = 1;
    return [ratingA];
  }

  @FieldResolver()
  public ratingsCount(@Root() _: Restaurant): number {
    return 123;
  }
}
