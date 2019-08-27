import { Field, ObjectType, ID } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsNotEmpty()
  lastName: string;

  @Field(() => Date)
  registrationDate: Date;
}
