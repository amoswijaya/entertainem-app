const Movie = require('../models/movie');
const Tv = require('../models/tvSeries');
const Redis = require("ioredis");
const redis = new Redis();

class Entertainme {
  static async getEntertainme(req, res) {
    try {
      const movies_tv = await redis.get('movies_tv')

      if (movies_tv) {
        console.log('inih dah ada di redis')
        res.status(200).json(JSON.parse(movies_tv))
      } else {
        console.log('inih belom ada di redis')
        const movies = await Movie.getMovie()
        const tvSeries = await Tv.getTvSeries()
        redis.set("movies_tv", JSON.stringify({ movies, tvSeries }))
        res.status(200).json({ movies, tvSeries })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Entertainme