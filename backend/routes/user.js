const express = require('express')
const router = express.Router()
const UserService = require('../services/user')

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/user')

const validationHandler = require('../utils/middlewares/validationHandler')

const userService = new UserService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query
  console.log(tags, req.params, req.query)

  try {
    const users = await userService.getUsers({ tags })
    res.status(200).json({
      data: users,
      message: 'users listed'
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', validationHandler({ userId: userIdSchema }, 'params'), async function (req, res, next) {
  const { userId } = req.params

  try {
    const user = await userService.getUser({ userId })
    res.status(200).json({
      data: user,
      message: 'user retrieved'
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router