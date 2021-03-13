const { gql } = require('apollo-server');
const axios = require('axios').default
const Redis = require("ioredis");
const redis = new Redis()


const url = 'http://localhost:4002/tv/'

module.exports = {
  typeDefs: gql`
    type Series{
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: String
    tags: [String]
  }
   
  input SeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  input SeriesEdit {
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  
  extend type Query {
    series:[Series]
    seriesById(_id: ID!):Series
  }

  extend type Mutation {
    addSeries(series:SeriesInput): Series
    editSeries(edit:SeriesEdit): Series
    deleteSeries(_id: ID!):Series
  }
`,
  resolvers: {
    Query: {
      series: async () => {
        try {
          const series = await redis.get('series')

          if (series) {
            console.log('inih dah ada di redis series')
            return JSON.parse(series)
          } else {
            console.log('inih belum ada di redis series')
            const { data } = await axios.get(url)
            redis.set('series', JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
        }
      },
      seriesById: async (_, args) => {
        try {
          const { data } = await axios.get(url + args._id)
          return data
        } catch (err) {
          console.log(err)
        }
      }
    },
    Mutation: {
      addSeries: async (_, args) => {
        console.log(args)
        try {
          const { data } = await axios.post(url, args.series)
          redis.del('series')
          return data
        } catch (err) {
          console.log(err)
        }
      },
      editSeries: async (_, args) => {
        const { title, overview, poster_path, popularity, tags } = args.edit
        const payload = {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
        const { data } = await axios.put(url + args.edit._id, payload)
        redis.del('series')
        console.log(data)
        return data
      },
      deleteSeries: async (_, args) => {
        console.log(args)
        try {
          const { data } = await axios.delete(url + args._id)
          redis.del('series')
          console.log(data)
          return data
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
