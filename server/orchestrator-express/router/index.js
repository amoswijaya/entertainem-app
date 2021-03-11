const route = require('express').Router()
const entertainme = require('../controllers/entertainmeController');
route.get('/entertainme', entertainme.getEntertainme)

module.exports = route