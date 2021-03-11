const { ObjectID } = require('bson')
const {getDatabase} = require('../config/mongoDb')


class TvSeries {
  static find() {
    return getDatabase().collection('Tv_Series').find().toArray()
  }

  static create(payload) {
    return getDatabase().collection('Tv_Series').insertOne(payload)
  }

  static update (id, payload) {
    return getDatabase().collection('Tv_Series').updateOne({
      _id: ObjectID(id)
    }, {
      $set: payload
    })
  }

  static destroy (id) {
    return getDatabase().collection('Tv_Series').deleteOne({_id:ObjectID(id)})
  }
}

module.exports = TvSeries