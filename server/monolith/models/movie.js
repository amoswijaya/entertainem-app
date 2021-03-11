const { ObjectID } = require('bson')
const {getDatabase} = require('../config/mongoDb')


class Movie {
  static find() {
    return getDatabase().collection('Movies').find().toArray()
  }

  static create(payload) {
    return getDatabase().collection('Movies').insertOne(payload)
  }

  static update (id, payload) {
    return getDatabase().collection('Movies').updateOne({
      _id: ObjectID(id)
    }, {
      $set: payload
    })
  }

  static destroy (id) {
    return getDatabase().collection('Movies').deleteOne({_id:ObjectID(id)})
  }
}

module.exports = Movie