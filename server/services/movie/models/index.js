const { ObjectID } = require('bson')
const {getDatabase} = require('../config/mongoDb')


class Movie {
  static find() {
    return getDatabase().find().toArray()
  }

  static findById(id) {
    return getDatabase().findOne({
      _id: ObjectID(id)
    })
  }

  static create(payload) {
    return getDatabase().insertOne(payload)
  }

  static update (id, payload) {
    return getDatabase().updateOne({
      _id: ObjectID(id)
    }, {
      $set: payload
    })
  }

  static destroy (id) {
    return getDatabase().deleteOne({_id:ObjectID(id)})
  }
}

module.exports = Movie