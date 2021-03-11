const express = require('express')
const {connect} = require('./config/mongoDb')
const route = require('./router/index')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connect().then((databse) => {
    console.log('mongo conected')
    app.use(route)
    app.listen(PORT, () => {
        console.log(`server running on PORT:${PORT}`)
    })
})
