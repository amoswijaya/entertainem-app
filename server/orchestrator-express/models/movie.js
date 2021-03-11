const axios = require('axios').default;

const baseUrl = 'http://localhost:3001/movie/'

class Movie {
  static getMovie() {
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

  static createMovie(payload) {
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

  static editMovie(id, payload) {
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

  static destroyMovie(id) {
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

module.exports = Movie