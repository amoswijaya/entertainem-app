const Movie = require('../controllers/movieController')

const route = require('express').Router()

route.get('/', Movie.findMovie)
route.post('/', Movie.createMovie)
route.put('/:id', Movie.editMovie)
route.delete('/:id', Movie.destroyMoivie)
module.exports = route