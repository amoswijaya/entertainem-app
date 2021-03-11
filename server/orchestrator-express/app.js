const express = require('express')
const route = require('./router/')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(route)
app.listen(PORT, () => console.log(`server running on port : ${PORT}`))