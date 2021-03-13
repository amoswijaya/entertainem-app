const route = require('express').Router()
const MovieController = require('../controllers/movieController');

route.get('/movie', MovieController.findAllMovie)
route.post('/movie', MovieController.createMovie)
route.put('/movie/:id', MovieController.editMovie)
route.delete('/movie/:id', MovieController.deleteMovie)

module.exports = route