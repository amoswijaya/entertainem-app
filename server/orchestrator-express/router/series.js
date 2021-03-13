const route = require('express').Router()

const SeriesController = require('../controllers/seriesController');

route.get('/series', SeriesController.findAllSeries)
route.post('/series', SeriesController.createSeries)
route.put('/series/:id', SeriesController.editSeries)
route.delete('/series/:id', SeriesController.deleteSeries)

module.exports = route