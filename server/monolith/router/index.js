const movie = require('./movie')
const tvSeries = require('./tvSeries')
const route = require('express').Router()

route.use('/movie',movie)
route.use('/tvseries', tvSeries)

module.exports = route