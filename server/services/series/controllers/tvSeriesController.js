const TvSeries = require('../models')


class TvSeriesController {
  static async findTvSeries (req, res) {
    try {
      const tvSeries = await TvSeries.find()
      res.status(200).json(tvSeries)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async findTvSeriesById (req, res) {
    try {
      const tvSerie = await TvSeries.findById(req.params.id)
      res.status(200).json(tvSerie)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async createTvSeries (req, res) {
    try {
      const data = await TvSeries.create(req.body)
      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async editTvSeries (req, res) {
    try {
      await TvSeries.update(req.params.id, req.body)
      res.status(200).json(req.body)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }

  static async destroyTvSeries(req, res) {
    try {
      const data = await TvSeries.destroy(req.params.id)
      res.status(200).json(data.result.ok)
    } catch (err) {
      res.status(400).json({err: err.message})
    }
  }
}

module.exports = TvSeriesController