const jwt = require('jsonwebtoken')
const { promisify } = require('utils')
const promiseJwt = promisify(jwt.sign)

class AuthService {
  constructor() {
    this.key = process.env
  }
  async login(user, pwd) {
    const token = await promiseJwt
  }
}
