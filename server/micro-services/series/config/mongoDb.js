const { MongoClient } = require('mongodb');


let db = null

async function connect() {
  try {
    const url = 'mongodb://localhost:27017'

    const client = new MongoClient(url, {useUnifiedTopology: true})

    await client.connect()

    const database = client.db('entertainme')
    const movies = database.collection('Tv_Series')
    db = movies
    return database
  } catch (err) {
    console.log(err)
  }
}

function getDatabase() {
  return db
}

module.exports = {
  connect, 
  getDatabase
}