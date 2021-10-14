const { Router } = require('express')
const authRouter = Router()
const authService = require('../service/auth')

authRouter.post('/login', async (req, res) => {
  const { user, password } = req.body
  try {
    console.log('req body es', req.body)
    const token = await authService.login(user, password)
    console.log('token es', token)
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = authRouter
