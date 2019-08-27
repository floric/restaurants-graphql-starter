import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Args,
  ResolverInterface
} from "type-graphql";
import { RatingsResponse } from "../rating/type";
import { User } from "./type";
import { fetchUserById, PersistedUser } from "../../persistence/user";
import { fetchRatingsForUser } from "../../persistence/ratings";
import { PaginatedListInput } from "../util";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User & PersistedUser> {
  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string) {
    return fetchUserById(id);
  }

  @FieldResolver()
  registrationDate(@Root() { creationDate }: PersistedUser) {
    return creationDate;
  }

  @FieldResolver(() => RatingsResponse)
  ratings(
    @Root() { id }: User,
    @Args() { page, pageSize }: PaginatedListInput
  ) {
    return fetchRatingsForUser(id, page, pageSize);
  }
}
