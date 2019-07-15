import { Arg, FieldResolver, Query, Resolver, Root, ResolverInterface } from "type-graphql";
import { User } from "../user/type";
import { Rating } from "./type";

@Resolver(() => Rating)
export class RatingResolver implements ResolverInterface<Rating> {
    private readonly items: Rating[] = [];

    @Query(() => Rating, { nullable: true })
    public async rating(
        @Arg("id") id: string
    ): Promise<Rating | undefined> {
        return await this.items.find(a => a.id === id);
    }

    @FieldResolver()
    public user(
        @Root() _: Rating
    ): User {
        const user = new User();
        user.firstName = "Florian";
        user.lastName = "Richter";
        return user;
    }
}
