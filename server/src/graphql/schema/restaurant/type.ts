import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
export class Restaurant {
    @Field(() => String)
    title: string;

    @Field(() => String, {
        nullable: true
    })
    description?: string;

    @Field(() => [Int])
    ratings: number[];

    @Field(() => Date)
    creationDate: Date;

    @Field(() => Int)
    get ratingsCount(): number {
        return this.ratings.length;
    }

    @Field(() => Float, { nullable: true })
    get averageRating(): number | null {
        const ratingsCount = this.ratingsCount;
        if (ratingsCount === 0) {
            return null;
        }
        const ratingsSum = this.ratings.reduce((a, b) => a + b, 0);
        return ratingsSum / ratingsCount;
    }
}
