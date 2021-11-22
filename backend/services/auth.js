const PersonService = require('../services/person')
const UserService = require('../services/user')
const jwt = require('jsonwebtoken')
const { config } = require('../config/index')

class AuthService {

  async loginUser({ email, password }) {
    if (!email || !password) return null
    const personService = new PersonService()
    const userService = new UserService()
    try {
      const person = await personService.filterPerson({ email })
      if (Object.entries(person).length != 0) {
        const user = await userService.filterUser({ idPerson: person._id.toString() })
        if (user.password === password) {
          const token = jwt.sign({
            rol: user.rol,
            email: person.email,
            fullName: person.fullName,
            dni: person.dni
          }, config.keyToken, {
            expiresIn: '12h'
          })
          return token
        }
      }
      return null
    } catch (err) {
      return err
    }
  }

  
}

module.exports = AuthService