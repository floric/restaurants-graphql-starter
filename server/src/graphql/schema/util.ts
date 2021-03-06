import { ClassType, ObjectType, Field, Int, ArgsType } from "type-graphql";

export const PaginatedResponse = <TItem>(TItemClass: ClassType<TItem>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field()
    page: number;

    @Field()
    pageSize: number;
  }
  return PaginatedResponseClass;
};

@ArgsType()
export class PaginatedListInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  page: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  pageSize: number;
}
