const { ApolloServer, gql } = require('apollo-server');
const Movie = require('./schema/movie.js')
const series = require('./schema/series.js');


const typeDefs = gql`
  type Query 
  type Mutation
`

const server = new ApolloServer({ typeDefs:[series.typeDefs, Movie.typeDefs, typeDefs], resolvers:[series.resolvers, Movie.resolvers] });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});