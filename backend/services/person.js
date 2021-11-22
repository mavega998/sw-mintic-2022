const MongoLib = require('../lib/mongo')

class PersonService {
  constructor() {
    this.collection = 'Person'
    this.mongoDB = new MongoLib()
  }

  async getPeople({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const people = await this.mongoDB.getAll(this.collection, query)
    return people || []
  }

  async filterPerson(filter) {
    const people = await this.mongoDB.getFilter(this.collection, filter)
    return people || {}
  }

  async getPerson({ personId }) {
    const person = await this.mongoDB.get(this.collection, personId)
    return person || {}
  }

  async createPerson({ person }) {
    const createPersonId = await this.mongoDB.create(this.collection, person)
    return createPersonId
  }

  async updatePerson({ personId, person } = {}) {
    const updatedPersonId = await this.mongoDB.update(this.collection, personId, person)
    return updatedPersonId
  }

  async deletePerson({ personId }) {
    const deletedPersonId = await this.mongoDB.delete(this.collection, personId)
    return deletedPersonId
  }
}

module.exports = PersonService