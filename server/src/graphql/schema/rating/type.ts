import { Field, Int, ObjectType, ID } from "type-graphql";
import { User } from "../user/type";

@ObjectType()
export class Rating {

    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String, {
        nullable: true
    })
    description?: string;

    @Field(() => Int)
    value: number;

    @Field(() => Date)
    creationDate: Date;

    @Field(() => User)
    user: User;
}
