const Movie = require('../models/movie')

class MovieController {
  static async findMovie(req, res) {
    try {
      const movie = await Movie.find()
      res.status(200).json(movie)
    } catch (err) {
      console.log(err)
    }
  }

  static async createMovie(req, res) {
    try {
      const data = await Movie.create(req.body)
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async editMovie(req, res) {
    try {
      const data = await Movie.update(req.params.id, req.body)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async destroyMoivie(req, res) {
    try {
      const data = await Movie.destroy(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieController