import { buildSchemaSync } from "type-graphql";
import { GraphQLSchema } from "graphql";

import { RestaurantResolver } from "./schema/restaurant/resolver";
import { RatingResolver } from "./schema/rating/resolver";
import { UserResolver } from "./schema/user/resolver";

export const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [RestaurantResolver, RatingResolver, UserResolver],
  emitSchemaFile: "schema.gql"
});
