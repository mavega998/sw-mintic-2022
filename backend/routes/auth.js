const express = require('express')
const router = express.Router()
const AuthService = require('../services/auth')

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/user')

const authService = new AuthService()

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await authService.loginUser({ email, password })
    res.status(200).json({
      data: user,
      message: user === null ? 'email or password wrong' : 'user authenticated'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router