const joi = require('joi')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userIdPerson = joi.string()
const userPasswordSchema = joi.string()
const userRolSchema = joi.string()
const userIsRecoverySchema = joi.boolean()

const createUserSchema = {
  idPerson: userIdPerson.required(),
  password: userPasswordSchema.required(),
  rol: userRolSchema.required(),
  isRecovery: userIsRecoverySchema
}

const updateUserSchema = {
  idPerson: userIdPerson,
  password: userPasswordSchema,
  rol: userRolSchema,
  isRecovery: userIsRecoverySchema
}

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}