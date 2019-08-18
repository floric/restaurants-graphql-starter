import { ClassType, ObjectType, Field, Int } from "type-graphql";

export const PaginatedResponse = <TItem>(TItemClass: ClassType<TItem>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
};
