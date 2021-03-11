const axios = require('axios').default;

const baseUrl = 'http://localhost:3002/tv'


class TvSeries {
  static async getTvSeries() {
    return new Promise(async (resolve, rejects) => {
      try {
        const { data } = await axios({
          url:baseUrl,
          method:'GET'
        })
        resolve(data)
      } catch (err) {
        rejects(err)
      }
    })
  }

  static createTvSeries(payload) {
    return new Promise( async (resolve, rejects) => {
      try {
        const {data} = await axios({
          url:baseUrl,
          method:'POST',
          data:payload
        })
        resolve(data)
      } catch (err) {
        rejects(err)
      }
    })
  }

  static editTvseries(id, payload) {
    return new Promise(async (resolve, rejects) => {
      try {
        const {data} = await axios({
          url:baseUrl+id,
          method:'PUT',
          data:payload
        })        
        resolve(data)
      } catch (err) {
        rejects(err)
      }
    })
  }

  static destroyTvSeries(id) {
    return new Promise(async (resolve, rejects) => {
      try {
        const {data} = await axios({
          url:baseUrl+id,
          method:'DELETE'
        })
        resolve(data)
      } catch (err) {
        rejects(err)
      }
    })
  }
}

module.exports = TvSeries