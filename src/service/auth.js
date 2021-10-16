const jwt = require('jsonwebtoken')
//generando el token, de forma syncrona
class AuthService {
  constructor() {
    this.key = process.env.SECRET_KEY
  }
  async login(user, pwd) {
    // console.log('parametros recibidos', user, pwd)
    try {
      const token = jwt.sign({ user, pwd }, this.key)
      return token
    } catch (err) {
      console.log('error', err)
    }
  }
}
module.exports = new AuthService()
