const route = require('express').Router()

const TvSeries = require('../controllers/tvSeriesController')

route.get('/tv',TvSeries.findTvSeries)
route.post('/tv',TvSeries.createTvSeries)
route.put('/tv/:id',TvSeries.editTvSeries)
route.delete('/tv/:id',TvSeries.destroyTvSeries)


module.exports = route