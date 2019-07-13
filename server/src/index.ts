import "reflect-metadata";

import Fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";

import { logError, logger } from "./utils/logger";
import { context } from "./graphql/context";
import { schema } from "./graphql/schema";

if (typeof window === "undefined") {
    (global as any).window = {};
}

const startServer = () => {
    const port = Number.parseInt(process.env.PORT || "3000");

    const server = new ApolloServer({
        context,
        schema
    });

    const app = Fastify({ logger, ignoreTrailingSlash: true });
    app
        .register(server.createHandler({ path: "/api" })) //
        .listen(port);

    app.setErrorHandler((error, _, reply) => {
        reply.status(500).send();
        logError(error);
    });
    app.setNotFoundHandler((_, reply) => reply.status(404).send());
};

startServer();
