const joi = require('joi')

const personIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const personFullNameSchema = joi.string().max(150)
const personDNISchema = joi.number()
const personPhoneSchema = joi.string().length(10).pattern(/^[0-9]+$/)
const personEmailSchema = joi.string().email()

const createPersonSchema = {
  fullName: personFullNameSchema.required(),
  dni: personDNISchema.required(),
  phone: personPhoneSchema.required(),
  email: personEmailSchema.required()
}

const updatePersonSchema = {
  fullName: personFullNameSchema,
  dni: personDNISchema,
  phone: personPhoneSchema,
  email: personEmailSchema
}

module.exports = {
  personIdSchema,
  createPersonSchema,
  updatePersonSchema
}