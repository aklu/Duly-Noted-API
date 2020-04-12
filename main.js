import Apollo from "apollo-server";
import importAsString from "import-as-string";
const schema = importAsString("./schema.graphql");

const { ApolloServer } = Apollo;

const resolvers = {
    Mutation: {
        echo(_, args) {
            return args.str;
        }
    },
    Query: {
        ping() {
            return "pong";
        }
    }
};

const server = new ApolloServer ({
    resolvers,
    typeDefs: schema
});

server.listen({ port: 3030 }).then((result) => {
    console.log(`Server listening at ${result.url}`);
});