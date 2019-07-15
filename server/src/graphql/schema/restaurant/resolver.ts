import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ResolverInterface,
  Int
} from "type-graphql";

import { Restaurant } from "./type";
import { Rating } from "../rating/type";

const a = new Restaurant();
a.title = "Best ever";
a.id = "abcde";
a.creationDate = new Date();

const b = new Restaurant();
b.title = "Worsed ever";
b.id = "12345";
b.creationDate = new Date(2014, 1, 1);

@Resolver(() => Restaurant)
export class RestaurantResolver implements ResolverInterface<Restaurant> {
  private readonly items: Restaurant[] = [a, b];

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
  public ratingsCount(
    @Root() _: Restaurant
  ): number {
    return 123;
  }
}
