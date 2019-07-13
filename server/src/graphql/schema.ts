import { buildSchemaSync } from "type-graphql";
import { GraphQLSchema } from "graphql";

import { RestaurantResolver } from "./schema/restaurant/resolver";

export const schema: GraphQLSchema = buildSchemaSync({
    resolvers: [RestaurantResolver],
    emitSchemaFile: "schema.gql"
});
