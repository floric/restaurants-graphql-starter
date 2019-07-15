import { Field, Float, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Restaurant {

    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String, {
        nullable: true
    })
    description?: string;

    @Field(() => Date)
    creationDate: Date;

    @Field(() => Int)
    get ratingsCount(): number {
        return 123;
    }

    @Field(() => Float, { nullable: true })
    get averageRating(): number | null {
        return 3.53;
    }
}
