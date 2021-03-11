const MovieController = require('../controllers/movieController')

const route = require('express').Router()


route.get('/movie', MovieController.findMovie)
route.post('/movie', MovieController.createMovie)
route.put('/movie/:id', MovieController.editMovie)
route.delete('/movie/:id', MovieController.destroyMoivie)
module.exports = route