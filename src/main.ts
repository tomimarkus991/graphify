// eslint-disable-next-line import/order
import * as dotenv from "dotenv";

dotenv.config();

import http from "http";

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express, { Request } from "express";

import { getSchema, verifyJWT } from "utils";

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: getSchema(),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req }: { req: Request }) => {
      const hasAccess = verifyJWT(req.headers.authorization || "");
      return { hasAccess };
    },
  });
  app.use(cors());
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
