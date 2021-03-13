const Movie = require('../models')

class MovieController {
  static async findMovie(req, res) {
    try {
      const movie = await Movie.find()
      res.status(200).json(movie)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async findMovieById (req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
      res.status(200).json(movie)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async createMovie(req, res) {
    try {
      const data = await Movie.create(req.body)
      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async editMovie(req, res) {
    try {
      await Movie.update(req.params.id, req.body)
      res.status(200).json(req.body)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async destroyMoivie(req, res) {
    try {
      const data = await Movie.destroy(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }
}

module.exports = MovieController