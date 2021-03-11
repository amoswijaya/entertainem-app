const TvSeries = require('../models/tvSeries')


class TvSeriesController {
  static async findTvSeries (req, res) {
    try {
      const tvSeries = await TvSeries.find()
      res.status(200).json(tvSeries)
    } catch (err) {
      console.log(err)
    }
  }

  static async createTvSeries (req, res) {
    try {
      const data = await TvSeries.create(req.body)
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async editTvSeries (req, res) {
    try {
      const data = await TvSeries.update(req.params.id, req.body)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async destroyTvSeries(req, res) {
    try {
      const data = await TvSeries.destroy(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = TvSeriesController