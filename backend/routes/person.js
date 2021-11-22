const express = require('express')
const router = express.Router()
const PersonService = require('../services/person')

const {
  personIdSchema,
  createPersonSchema,
  updatePersonSchema
} = require('../utils/schemas/person')

const validationHandler = require('../utils/middlewares/validationHandler')

const personService = new PersonService();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
        const people = await personService.getPeople({ tags });

        res.status(200).json({
            data: people,
            message: 'people listed'
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:personId', validationHandler({ personId: personIdSchema }, 'params'), async function (req, res, next) {
    const { personId } = req.params;

    try {
        const person = await personService.getPerson({ personId });

        res.status(200).json({
            data: person,
            message: 'person retrieved'
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', validationHandler(createPersonSchema), async function (req, res, next) {
    const { body: person } = req;
    try {
        const createdPersonId = await personService.createPerson({ person });

        res.status(201).json({
            data: createdPersonId,
            message: 'person created'
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:personId', validationHandler({ personId: personIdSchema }, 'params'),
    validationHandler(updatePersonSchema), async function (req, res, next) {
        const { personId } = req.params;
        const { body: person } = req;

        try {
            const updatedPersonId = await personService.updatePerson({
                personId,
                person
            });

            res.status(200).json({
                data: updatedPersonId,
                message: 'person updated'
            });
        } catch (err) {
            next(err);
        }
    });

router.delete('/:personId', validationHandler({ personId: personIdSchema }, 'params'), async function (req, res, next) {
    const { personId } = req.params;

    try {
        const deletedPersonId = await personService.deletePerson({ personId });

        res.status(200).json({
            data: deletedPersonId,
            message: 'person deleted'
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;