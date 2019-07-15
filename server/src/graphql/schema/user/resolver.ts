import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Rating } from "../rating/type";
import { User } from "./type";

@Resolver(() => User)
export class UserResolver {
    private readonly items: User[] = [];

    @Query(() => User, { nullable: true })
    public async user(
        @Arg("id") id: string
    ): Promise<User | undefined> {
        return await this.items.find(a => a.id === id);
    }

    @FieldResolver(() => [Rating])
    public ratings(
        @Root() _: User
    ): Rating[] {
        return [];
    }
}
