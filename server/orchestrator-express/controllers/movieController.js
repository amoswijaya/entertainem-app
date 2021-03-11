const Movie = require('../models/movie');
const Redis = require("ioredis");
const redis = new Redis();
class MovieCtroller {
  static async createMovie(req, res) {
    try {
      await redis.del('movies_tv')
      const data = await Movie.createMovie(req.body)
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieCtroller