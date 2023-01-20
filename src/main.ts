import dotenv from "dotenv"

dotenv.config();

import http from "http";

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express, { Request } from "express";

import { getSchema, verifyJWT } from "./utils";

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

  const port = process.env.PORT || 4000;

  httpServer.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startApolloServer();
