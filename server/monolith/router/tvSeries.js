const route = require('express').Router()

const TvSeries = require('../controllers/tvSeriesController')

route.get('/',TvSeries.findTvSeries)
route.post('/',TvSeries.createTvSeries)
route.put('/:id',TvSeries.editTvSeries)
route.delete('/:id',TvSeries.destroyTvSeries)


module.exports = route