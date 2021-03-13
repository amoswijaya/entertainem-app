const route = require('express').Router()
const entertainme = require('../controllers/entertainmeController');
const Movie = require('./movie')
const Series = require('./series')

route.get('/entertainme', entertainme.getEntertainme)
route.use('/entertainme', Movie)
route.use('/entertainme', Series)
module.exports = route