const Series = require('../models/tvSeries');
const Redis = require("ioredis");
const redis = new Redis();
class SeriesController {


  static async findAllSeries(req, res) {
    try {
      const series = await redis.get('series')
      if (series) {
        res.status(200).json(JSON.parse(series))
      } else {
        const data = await Series.getTvSeries()
        redis.set('series', JSON.stringify(data))
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

  static async createSeries(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('series')
      const data = await Series.createTvSeries(req.body)
      res.status(201).json(data)
    } catch (err) {
      if(err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      }else{
        res.status(500).json('Internal server error')
      }
    }
  }

  static async editSeries(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('series')
      const data = await Series.editTvseries(req.params.id, req.body)
      res.status(200).json(data)
    } catch (err) {
      if (err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      } else {
        res.status(500).json('Internal server error')
      }
    }
  }

  static async deleteSeries(req, res) {
    try {
      await redis.del('movies_tv')
      await redis.del('series')
      const data = await Series.destroyTvSeries(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      if (err.response.status == 404) {
        res.status(404).json(err.response.statusText)
      } else {
        res.status(500).json('Internal server error')
      }
    }
  }
}

module.exports = SeriesController