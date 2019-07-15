import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class User {

    @Field(() => ID)
    id: string;

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => Date)
    registrationDate: Date;
}
