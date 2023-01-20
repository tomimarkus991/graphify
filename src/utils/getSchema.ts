import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";

import { resolvers } from "../schemas";

export const getSchema = () => {
  const schema = loadSchemaSync("./src/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  return addResolversToSchema({
    schema,
    resolvers,
  });
};
