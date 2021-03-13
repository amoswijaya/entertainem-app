const { gql } = require('apollo-server');
const axios = require('axios').default
const Redis = require("ioredis");
const redis = new Redis()


const url = 'http://localhost:4001/movie/'



module.exports = {
  typeDefs: gql`
    type Movie{
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: String
      tags: [String]
    }

    input MovieInput {
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }
  
    input MovieEdit {
      _id: ID!
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float!
      tags: [String]!
    }

    extend type Query {
      movies:[Movie]
      movieById(_id: ID!):Movie
    }

    extend type Mutation {
      addMovie(movie:MovieInput): Movie
      editMovie(edit:MovieEdit): Movie
      deleteMovie(_id: ID!): Movie
    }
    `,
  resolvers: {
    Query: {
      movies: async () => {
        try {
          const movies = await redis.get('movies')
          if (movies) {
            console.log('inih dah ada di redis movies')
            return JSON.parse(movies)
          } else {
            console.log('inih belum ada di redis movies')
            const { data } = await axios.get(url)
            redis.set('movies', JSON.stringify(data))
            return data
          }
        }
        catch (err) {
          console.log(err)
        }
      },
      movieById: async (_, args) => {
        try {
          const { data } = await axios.get(url + args._id)
          return data
        } catch (err) {
          console.log(err)
        }
      }
    },
    Mutation: {
      addMovie: async (_, args) => {
        console.log(args)
        try {
          const { data } = await axios.post(url, args.movie)
          console.log(data)
          redis.del('movies')
          return data

        } catch (err) {
          console.log(err)
        }
      },
      editMovie: async (_, args) => {
        const { title, overview, poster_path, popularity, tags } = args.edit
        const payload = {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
        const { data } = await axios.put(url + args.edit._id, payload)
        redis.del('movies')
        console.log(data)
        return data
      },
      deleteMovie: async (_, args) => {
        console.log(args)
        try {
          const { data } = await axios.delete(url + args._id)
          redis.del('movies')
          console.log(data)
          return data
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}