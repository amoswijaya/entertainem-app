const express = require('express')
const {connect} = require('./config/mongoDb')
const route = require('./route')
const app = express()
const PORT = 4002

app.use(express.json())
app.use(express.urlencoded({extended: false}))


connect().then((databse) => {
    console.log('mongo conected')
    app.use(route)
    app.listen(PORT, () => {
        console.log(`tahu bulat di goreng dadakan ${PORT}an`)
    })
})