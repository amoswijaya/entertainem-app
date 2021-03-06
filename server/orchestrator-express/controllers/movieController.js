const Movie = require('../models/movie');
const Redis = require("ioredis");
const redis = new Redis();
class MovieController {


  static async findAllMovie(req, res) {
    try {
      const movies = await redis.get('movies')
      if(movies) {
        res.status(200).json(JSON.parse(movies))
      }else{
        const data = await Movie.getMovie()
        redis.set('movies', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      if(err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      }else{
        res.status(500).json('Internal server error')
      }
    }
  }

  static async createMovie(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('movies')
      const data = await Movie.createMovie(req.body)
      res.status(201).json(data)
    } catch (err) {
      if(err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      }else{
        res.status(500).json('Internal server error')
      }
    }
  }

  static async editMovie(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('movies')
      const data = await Movie.editMovie(req.params.id, req.body)
      res.status(200).json(data)
    } catch (err) {
      if(err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      }else{
        res.status(500).json('Internal server error')
      }
    }
  }

  static async deleteMovie(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('movies')
      const data = await Movie.destroyMovie(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      if(err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      }else{
        res.status(500).json('Internal server error')
      }
    }
  }
}

module.exports = MovieController