const express = require('express')
const {connect} = require('./config/mongoDb')
const route = require('./route')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({extended: false}))


connect().then((databse) => {
    console.log('mongo conected')
    app.use(route)
    app.listen(PORT, () => {
        console.log(`I Love U ${PORT}`)
    })
})